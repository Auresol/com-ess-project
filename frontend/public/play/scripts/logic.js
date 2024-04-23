let sentences = [];
let boxs = [];
let timeleft;
let last = false;

let alreadyStop = false;

const container = document.getElementById('gamebox');

function deleteItselfWhenTheAnimationIsEnd(event){
    removeBox(event.target.textContent);
}

function createBox(sentence) {

    if(alreadyStop){
        return;
    }

  //const container = document.getElementById('gamebox');

  const box = document.createElement('div');
  boxs.push(box);
  
  box.addEventListener('animationend',deleteItselfWhenTheAnimationIsEnd);
  box.textContent = sentence;
  box.classList.add('falling-box');
  box.classList.add('no-select');

  // Generate random position within container bounds
  const maxWidth = container.clientWidth - box.clientWidth;
  const randomX = Math.abs(Math.floor((Math.random() - 0.2) * maxWidth));

  box.style.left = `${randomX}px`;
  box.style.top = `0px`;

  const fallDistance = container.clientHeight;

  box.style.transform = `translateY(${fallDistance}px)`

  container.appendChild(box);
}

// Set spawn interval (in milliseconds)
const spawnInterval = 1000; // Spawns every 1 seconds

const spawnBox = async function (sentences_in){
    sentences = sentences_in;
    console.log("Enter spawnBox");

    for(let i = 1;i < 20;i++){
        setTimeout(() => {
            if(!alreadyStop){
                createBox(sentences_in[i].sentence);
                if(i == 19){
                    last = true;
                }
            }   
        },i * 6000)
    }
}


const checkSentence = function (answer){
    if(alreadyStop){
        return -1;
    }

    const score = removeBox(answer)
    console.log(score);

    if(boxs.length === 0 && last){
        return -1;
    }

    return score;
}

const removeBox = function(sentence){
    if(alreadyStop){
        return 0;
    }

    for(let i = 0;i < boxs.length;i++){
        const box = boxs[i];
        if(box.textContent == sentence){

            boxs.splice(i,1);
            container.removeChild(box);

            return 1
        }
    }  

    return 0;
}

const setAlreadyStop = function(){
    alreadyStop = true;
    for(let i = 0;i < boxs.length;i++){
        const box = boxs[i];
        box.classList.add('box-faded-out')
    }
}



export { spawnBox, checkSentence, setAlreadyStop };