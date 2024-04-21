import mongoose from 'mongoose';

const roomStateSchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room'
  },
  event: {
    type: [(String, Number, Number)],
    required: true
  },
  score: {
    type: [(String, Number)],
    required: true
  }
});
  
const RoomState = mongoose.model('RoomState', roomStateSchema);

export default RoomState;
