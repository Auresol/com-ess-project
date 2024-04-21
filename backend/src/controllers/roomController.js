import Gamemode from '../models/gamemode.js'; 
import Room from '../models/room.js';
import User from '../models/user.js';
import RoomState from '../models/roomState.js';

import { wordGeneration } from '../utils/wordGeneration.js';

export const createRoom = async (req, res) => {
  const { name, gamemode_id, max_size } = req.body;
  const user = req.user;
  
  console.log(user);
  
  try{

    const newRoom = new Room({ 
      name : name, 
      gamemode : gamemode_id, 
      users : [user._id],
      max_size : max_size==null? 10 : max_size,
      state : "WAITING"
    });

    await newRoom.save();
    await changeUserState(user._id, "WAITING");
    
    res.status(201).json(newRoom);

  } catch (error) {
    
    res.status(409).json({ message: error.message });
  }
}

export const getRoom = async (req, res) => { 
  const { id } = req.params;

  try {
    //get a room, populate the gamemode and userStates
    const room = await Room.findById(id).populate(['gamemode', 'users']).exec();

    res.status(200).json(room);

  } catch (error) {
    res.status(404).json({ message: error.message });

  }
}

export const getRooms = async (req, res) => {
  
  try {
    const rooms = await Room.find().populate('gamemode');
    res.status(200).json(rooms);

  } catch (error) {
    res.status(404).json({ message: error.message });

  }
}

export const joinRoom = async (req, res) => {
  
  const { id } = req.params;
  const user = req.user;

  try {

    const room = await roomQuery(id);
   
    if(room.users.includes(user._id)){
        return res.status(409).json({ message: "User already in room" });
    }

    if(room.users.length >= room.max_size){
      return res.status(409).json({ message: "Room is full" });
    }

    room.users.push(user._id);

    await room.save();
    await changeUserState(user._id, "WAITING");

    res.status(200).json(room);

  } catch (error) {
    res.status(404).json({ message: error.message });

  }
}

export const deleteRoom = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  try {

    const room = await Room.findById(id).populate('users');

    if(room.users[0]._id != user._id){
      return res.status(409).json({ message: "User not a head" });
    }

    for(const user of room.users){
      changeUserState(user._id, "ONLINE");
    }

    await Room.findByIdAndRemove(id);
    
    //delete roomState, if exists
    await RoomState.findOneAndRemove({ room : room._id });

    res.status(200).json({ message: "Room deleted successfully" });

  } catch (error) {
    res.status(404).json({ message: error.message });

  }
}

export const leaveRoom = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  try {

    const room = await roomQuery(id);
    
    if(!room.users.includes(user._id)){
      return res.status(409).json({ message: "User not in room" });
    }

    room.users = room.users.filter((id) => id != user._id);

    if (room.users.length == 0) {
      await Room.findByIdAndRemove(id);
    } else {
      await room.save();
    }

    await changeUserState(user._id, "ONLINE");

    res.status(200).json(room);

  } catch (error) {
    res.status(404).json({ message: error.message });

  }
}

export const startRoom = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  try {

    const room = await Room.findById(id).populate(['gamemode', 'users']);

    if(room.state == "PLAYING"){
      return res.status(409).json({ message: "Game already started" });
    }

    if(room.users[0]._id != user._id){
      return res.status(409).json({ message: "User not a head" });
    }

    const gamemode = await Gamemode.findById(room.gamemode);
    const sentenceList = await wordGeneration(gamemode._id);

    if(sentenceList.length == 0){
      return res.status(409).json({ message: "Error occured : Wordlist is empty" });
    }
    
    room.sentences = sentenceList.map((sentence) => sentence._id); 
    room.populate('sentences');
    room.state = "PLAYING";

    for(const user of room.users){
      user.state = "PLAYING";
    }

    await room.save();
    
    const newRoomState = new RoomState({
      room : room._id,
      state : "PLAYING",
      event : [],
      score : room.users.map((user) => [user._id, 0])
    });

    res.status(200).json(room);

  } catch (error) {
    res.status(404).json({ message: error.message });

  }
}

export const updatePlayer = async (req, res) => {
  const { id } = req.params;
  const { timepass, score, state } = req.body;
  const user = req.user;

  try {

    const room = await roomQuery(id);

    const roomState = await RoomState.findOne({ room : room._id });

    if(roomState.state == "WAITING"){
      return res.status(409).json({ message: "Game not started" });
    }

    if(roomState.state == "ENDED"){
      return res.status(409).json({ message: "Game ended" });
    }
    
    //insert in the way that it will always sorted
    if(roomState.event.length == 0){
      roomState.event.push([user.name, timepass,score]);
    }else{
      let i = 0;
      while(roomState.event[i][1] < timepass && i < roomState.event.length){
        i++;
      }
      roomState.event.insert(i, [user.name, timepass, score]);
    }

    //update score
    const index = roomState.score.findIndex((user) => user[0] == user.name);
    roomState.score[index][1] = score;
    
    await roomState.save();

    res.status(200).json("Update success");

  } catch (error) {
    res.status(404).json({ message: error.message });

  }
}

export const getRoomState = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  try {

    const room = await Room.findById(id).populate('user');

    let is_end = true;
    for(const user of room.users){
      if(user.state != "ENDED"){
        is_end = false;
        break;
      }
    }

    if(is_end){
      room.state = "ENDED";
      await room.save();
    }
    
    const roomState = await RoomState.findOne({ room : room._id });

    if(roomState == null){
      return res.status(409).json({ message: "Room not started" });
    }

    roomState.state = room.state;
    roomState.score.sort((a, b) => b[1] - a[1]);
    roomState.save();

    res.status(200).json(roomState);

  } catch (error) {
    res.status(404).json({ message: error.message });

  }
}


async function roomQuery(id){
  const room = await Room.findById(id);
  
  if(!room){
    throw new Error("Room not found");
  }

  return room;
}

async function changeUserState(user_id, state){
  try{
    const user = await User.findById(user_id);
    user.state = state;
    await user.save();
  }catch (error) {
    throw new Error("User not found");
  }
}

