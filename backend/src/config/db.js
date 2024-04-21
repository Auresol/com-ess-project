import mongoose from 'mongoose';

mongoose.connect('mongodb://root:root123@127.0.0.1:27017/').then(() => {
  console.log(`successfully connected`);
}).catch((e) => {
  console.log(`not connected` + e);
}); 
