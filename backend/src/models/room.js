import mongoose from 'mongoose'; 
import User from './user.js';
import Gamemode from './gamemode.js';
import Sentence from './sentence.js';

const roomSchema = new mongoose.Schema({

  join_code: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    unique: true,
    required: true
  },
  gamemode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gamemode',
    required: true
  },
  max_size: {
    type: Number,
    required: true
  },
  users: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    required: true
  }, 
  state: {
    type: String,
    required: true
  },
  sentences: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Sentence',
    required: false
  }

  
});

const Room = mongoose.model('Room', roomSchema);

export default Room;
