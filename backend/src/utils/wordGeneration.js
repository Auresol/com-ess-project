import Gamemode from '../models/gamemode.js'; 
import Sentence from '../models/sentence.js';

export const wordGeneration = async function(gamemode_id){

  try {

    const gamemode = await Gamemode.findById(gamemode_id)

    if(!gamemode) {
      throw new Error("Error occured : Game not found");
    }
    
    const { type, word_num, word_min_length, wordMaxlength } = gamemode;
    let sentences = [];
    
    if(type != 'all'){
      sentences = await Sentence.find({type:type}).where(`length`).gte(word_min_length).lte(wordMaxlength).exec();
    }else{
      sentences = await Sentence.where(`length`).gte(word_min_length).lte(wordMaxlength).exec();
    }
    
    const filterSentences = [...sentences].sort(() => Math.random() - 0.5).slice(0, word_num);
    return filterSentences;

  } catch (error) {
    throw new Error("Error occured : " + error.message);
  }
};
      
  

