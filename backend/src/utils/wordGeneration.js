import Gamemode from '../models/gamemode.js'; 
import Sentence from '../models/sentence.js';

export const wordGeneration = async function(gamemode_id){

  try {

    const gamemode = await Gamemode.findById(gamemode_id)

    if(!gamemode) {
      throw new Error("Error occured : Game not found");
    }
    
    const { type, word_num, word_min_length, word_max_length } = gamemode;
    let sentences = [];
    
    if(type != 'all'){
      sentences = await Sentence.find({type:type}).where(`length`).gte(word_min_length).lte(word_max_length).exec();
    }else{
      sentences = await Sentence.where(`length`).gte(word_min_length).lte(word_max_length).exec();
    }
    
    const filterSentences = [...sentences].sort(() => Math.random() - 0.5).slice(0, word_num);
    return filterSentences;

  } catch (error) {
    throw new Error("Error occured : " + error.message);
  }
};
      
  

