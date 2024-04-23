import User from "../models/user.js";
import "dotenv/config";

export const getUser = async (req, res) => {
  
  const user = req.user;
  console.log(user)

  try {
  console.log(user._id)
    const userOut = await User.findById(user._id);
    console.log(userOut)
    res.status(200).json(userOut);

  } catch (error) {
    res.status(500).json({ message: "Something went wrong : " + error });
  }

}
