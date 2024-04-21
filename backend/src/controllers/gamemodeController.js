import Gamemode from '../models/gamemode.js'; 
import Sentence from '../models/sentence.js';

export const createGamemode = async (req, res) => {
  try {
    const gamemode = new Gamemode(req.body);
    await gamemode.save();

    res.status(200).json({ gamemode });
  
  }catch (error) {
    res.status(500).json({ message: "Something went wrong : " + error });
  }

};

export const createSentence = async (req, res) => {
  try{ 
    const sentence = new Sentence(req.body);
    sentence.length = sentence.sentence.length;
    
    await sentence.save();
    
    res.status(200).json({ sentence });
  }catch (error) {
    res.status(500).json({ message: "Something went wrong : " + error });
  }
}    
  


