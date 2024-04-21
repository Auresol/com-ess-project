import mongoose from 'mongoose'; 

const authenSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  email:{
    type: String,
    unique: true,
    required: true
  },
  password:{
    type: String,
    required: true
  }
})

const Authen = mongoose.model('Authen', authenSchema);

export default Authen;
