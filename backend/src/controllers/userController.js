import User from "../models/user.js";
import "dotenv/config";

export const getUser = async (req, res) => {
  
  const user = req.user;

  try {
    const user = await User.findById(req.user._id);
    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({ message: "Something went wrong : " + error });
  }

}
