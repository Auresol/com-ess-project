import User from "../models/user.js";
import Authen from "../models/authen.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const signup = async (req, res) => {
  try {
    const { name, email, password, role} = req.body;

    const newUser = new User({
      name : name,
      role : role,
      state : "ONLINE",
    });

    await newUser.save();

    const newAuthen = new Authen({
      email : email,
      password : password,
      user : newUser._id,
    });

    await newAuthen.save();

    const token = jwt.sign({ name: name, _id: newUser._id},
      process.env.JWT_SECRET_KEY, { expiresIn: "1d" });

    res.status(200).json({ newUser, token });

  } catch (error) {
    res.status(500).json({ 
      message: "Something went wrong : " + error, 
    });  
  }

};

export const login = async (req, res) => {
  try {
    const {email, password} = req.body;
    
    const user = await Authen.findOne({ name: name, password: password });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const token = jwt.sign({ email: email, _id: user.user},
      process.env.JWT_SECRET_KEY, { expiresIn: "1d" });

    res.status(200).json({ token });

  }catch (error) {
    res.status(500).json({ message: "Something went wrong : " + error });
  }
}

