import mongoose from 'mongoose'; 

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    unique: true,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', userSchema);

export default User;
