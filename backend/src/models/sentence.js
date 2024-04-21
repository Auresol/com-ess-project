import mongoose from 'mongoose'; 

const sentenceSchema = new mongoose.Schema({

  type:{
    type: String,
    required: true
  },
  language:{
    type: String,
    required: true
  },
  length:{
    type: Number,
    required: true
  },
  sentence: {
    type: String,
    unique: true,
    required: true
  },
  by: {
    type: String,
    required: false
  }

});

const Sentence = mongoose.model('Sentence', sentenceSchema);

export default Sentence;
