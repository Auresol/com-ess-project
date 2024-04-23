import Gamemode from '../models/gamemode.js'; 
import Room from '../models/room.js';
import User from '../models/user.js';
import RoomState from '../models/roomState.js';

import { wordGeneration } from '../utils/wordGeneration.js';

export const createRoom = async (req, res) => {
  const { name, gamemode_id, max_size } = req.body;
  const user = req.user;
  
  let newRoom;
  let join_code;

  while(true){
    join_code = Math.max(10000 + Math.floor(Math.random() * 90000) - 1);
    if(await Room.findOne({ join_code : join_code }) == null){
      break;
    }
  }
  
  try{

    newRoom = new Room({ 
      join_code : join_code,
      name : name, 
      gamemode : gamemode_id, 
      users : [user._id],
      max_size : max_size==null? 10 : max_size,
      state : "WAITING"
    });

    await newRoom.save();
    await changeUserState(user._id, "WAITING");
    
    res.status(200).json(newRoom);

  } catch (error) {

    if(newRoom){
      await Room.findOneAndDelete({_id : newRoom._id});
      if(await User.findById(user._id) != null){
        await changeUserState(user._id, "ONLINE");
      }
    }
    
    res.status(409).json({ message: error.message });
  }
}

export const getRoom = async (req, res) => { 
  const { id } = req.params;

  try {
    //get a room, populate the gamemode and userStates
    const room = await Room.findOne({ join_code : id }).populate(['gamemode', 'users', 'sentences']).exec();

    if(!room || room.length == 0){
      return res.status(409).json({ message: "Room not found" });
    }

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

    const room = await Room.findOne({ join_code : id })  

    if(!room){
      return res.status(409).json({ message: "Room not found" });
    }
   
    if(room.users.includes(user._id)){
        return res.status(409).json({ message: "User already in room" });
    }

    if(room.users.length >= room.max_size){
      return res.status(409).json({ message: "Room is full" });
    }

    room.users.push(user._id);

    await room.save();
    await changeUserState(user._id, "WAITING");

    res.status(200).json(room.populate('users'));

  } catch (error) {
    res.status(404).json({ message: error.message });

  }
}

export const deleteRoom = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  try {

    const room = await Room.findOne({ join_code : id }).populate('users');

    if(room.users[0]._id != user._id){
      return res.status(409).json({ message: "User not a head" });
    }

    for(const user of room.users){
      changeUserState(user._id, "ONLINE");
    }

    await Room.findOneAndDelete({ join_code : id });
    
    //delete roomState, if exists
    await RoomState.findOneAndDelete({ room : room._id });

    res.status(200).json({ message: "Room deleted successfully" });

  } catch (error) {
    res.status(404).json({ message: error.message });

  }
}

export const leaveRoom = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  try {

    const room = await Room.findOne({ join_code : id })

    if(!room){
      return res.status(409).json({ message: "Room not found" });
    }
    
    if(!room.users.includes(user._id)){
      return res.status(409).json({ message: "User not in room" });
    }

    room.users = room.users.filter((userid) => userid != user._id);

    if (room.users.length == 0) {
      await Room.findOneAndDelete({ join_code : id });
      return res.status(200).json({ message: "Empty room -> Room deleted successfully" });
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

  let room;
  let newRoomState;

  try {

    room = await Room.findOne({ join_code : id }).populate(['users', 'gamemode']);

    if(!room){
      return res.status(409).json({ message: "Room not found" });
    }

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

    await room.populate('sentences');

    room.state = "PLAYING";
    room.users.forEach((user) => user.state = "PLAYING");

    await room.save();
    
    newRoomState = new RoomState({
      room : room._id,
      state : "PLAYING",
      event : [],
      score : room.users.map((user) => [user.name, 0])
    });

    await newRoomState.save();

    res.status(200).json(room);

  } catch (error) {

    console.log("error : ", error);

    room.state = "WAITING";
    room.users.forEach((user) => user.state = "WAITING");
    room.sentences = [];
    await room.save();
    
    if(newRoomState){
      await RoomState.findOneAndDelete({ _id : newRoomState._id });
    }

    res.status(404).json({ message: error.message });

  }
}

export const updatePlayer = async (req, res) => {
  const { id } = req.params;
  const { timepass, score, state } = req.body;
  const user = req.user;

  try {

    const room = await Room.findOne({ join_code : id }).populate('users');

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
    const index = roomState.score.findIndex((index) => index[0] == user.name);
    if(index == -1){
      return res.status(409).json({ message: "User not found in room" });
    }
    roomState.score[index] = score;
    
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

    const room = await Room.findOne({ join_code : id }).populate('users');
    
    if(!room){
      return res.status(409).json({ message: "Room not found" });
    }

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
      return res.status(409).json({ message: "RoomState not exists" });
    }

    roomState.state = room.state;
    roomState.score = roomState.score.sort((a, b) => b[1] - a[1]);
    roomState.save();

    res.status(200).json(roomState);

  } catch (error) {
    res.status(404).json({ message: error.message });

  }
}

async function changeUserState(user_id, state){
  try{
    const user = await User.findById(user_id);
    user.state = state;
    await user.save();
  }catch (error) {
    console.log(error);
  }
}

