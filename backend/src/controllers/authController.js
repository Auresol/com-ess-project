import User from "../models/user.js";
import Authen from "../models/authen.js";
import "dotenv/config";

export const signup = async (req, res) => {

  let newUser, newAuthen;

  try {
    const { name, email, password, role} = req.body;

    newUser = new User({
      name : name,
      role : role,
      state : "ONLINE",
    });

    await newUser.save();

    newAuthen = new Authen({
      email : email,
      password : password,
      user : newUser._id,
    });

    await newAuthen.save();

    const token = JSON.stringify({token : process.env.JWT_SECRET_KEY, name: name, _id: newUser._id});

    res.status(200).json({ newUser, token });

  } catch (error) {
    
    if(newUser){
      await User.findByIdAndDelete(newUser._id);
    }
    if(newAuthen){
      await Authen.findByIdAndDelete(newAuthen._id);
    }

    res.status(500).json({ 
      message: "Something went wrong : " + error, 
    });  
  }

};

export const login = async (req, res) => {
  try {
    const {email, password} = req.body;
    
    const user = await Authen.findOne({ email:email, password: password });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const token = JSON.stringify({token : process.env.JWT_SECRET_KEY, _id: user._id});

    res.status(200).json({ token });

  }catch (error) {
    res.status(500).json({ message: "Something went wrong : " + error });
  }
}
