import { spawnBox, checkSentence, setAlreadyStop } from './logic.js'
import { getRoom, getRoomState, handlePutUser } from './api.js';

let sentences;
let score = 0;

const MAX_TIME = 90;
let timeleft = MAX_TIME;
let gameEnd = false;

document.addEventListener('DOMContentLoaded', async function() {
    
    const responseRoom = await getRoom();

    sentences = responseRoom.sentences;

    spawnBox(sentences);
    startTimer();
    updatePlayerData();
    console.log(localStorage.getItem("roomcode"))

    let response;
    response = await getRoomState();
    setAttribute(response);

    const getUsersInterval = setInterval(async function() {
        response = await getRoomState();
        console.log(response);
        setAttribute(response);
        if(response.state === "ENDED"){
            window.location.href = "../win/index.html"
        }
    }, 2000)


    const answerBox = document.getElementById('answerbox');

    answerBox.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault()

            let answer = answerBox.value;
            const increase_score = checkSentence(answer);

            if(increase_score === -1 || gameEnd){
                gameEnd = true;
                handlePutUser(MAX_TIME - timeleft, score, "ENDED");
            }
    
            if(increase_score > 0){
                score += increase_score;
    
                //document.getElementById("score0").textContent = "Score : " + score;
                answerBox.value = "";

                handlePutUser(MAX_TIME - timeleft, score, "PLAYING");
            }
        }

        if(event.key === 'Escape'){
            event.preventDefault()
            answerBox.value = "";
        }

    });
});

function setAttribute(response){

    const scores = response.score;
    document.getElementById("player0").textContent = scores[0][0] + " : " + scores[0][1];
    for(let i = 1;i <= 8;i++){
        
        if(i < scores.length){
            document.getElementById("player" + i).textContent = scores[i][0] + " : " + scores[i][1];
        }else{
            document.getElementById("player" + i).textContent = "";
        }
    }

    // const users = 
    // for(let i = 0;i < 9;i++){
    //     if(i < users.length){
    //         document.getElementById("score" + i).textContent = users[i].score;
    //     }else{
    //         document.getElementById("score" + i).textContent = "";
    //     }
    // }
}

async function updatePlayerData(){
    
    let response;
    const getUsersInterval = setInterval(async function() {
        response = await getRoomState();
        console.log(response);
        //setAttribute(response);
    }, 2000);
    
}
async function startTimer(){

    const timerInterval = setInterval(() => {
        timeleft -= 1;
        document.getElementById("time").textContent = "Time : " + timeleft;
        
        if(timeleft <= 0 || gameEnd){
            console.log("END TIME");
            setAlreadyStop();
            stopAllAnimation();
            handlePutUser(0, score, "ENDED");
            clearInterval(timerInterval);
        }
        
    },1000);

}

function stopAllAnimation(){
    
    const elements = document.querySelectorAll(`.falling-box`);

    for (const element of elements) {
      element.style.animationPlayState = 'paused';
    }
}
