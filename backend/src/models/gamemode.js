import mongoose from 'mongoose'; 

const gamemodeSchema = new mongoose.Schema({

  name: {
    type: String,
    unique: true,
    required: true
  },
  type:{
    type: String,
    required: true
  },
  word_num: {
    type: Number,
    required: true
  },
  word_min_length: {
    type: Number,
    required: true
  },
  word_max_length: {
    type: Number,
    required: true
  }
});

const Gamemode = mongoose.model('Gamemode', gamemodeSchema);

export default Gamemode;
