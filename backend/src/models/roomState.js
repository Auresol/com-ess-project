import mongoose from 'mongoose';

const roomStateSchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room'
  },
  state: {
    type: String,
    required: true
  },
  userState: {
    type: [Object],
    required: true
  },
  event: {
    type: [Object],
    required: true
  },
  score: {
    type: [Object],
    required: true
  }
});
  
const RoomState = mongoose.model('RoomState', roomStateSchema);

export default RoomState;
