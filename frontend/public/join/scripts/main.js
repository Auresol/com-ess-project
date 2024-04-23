import { getUsers } from './api.js';
import { handleLeaveRoom } from './api.js';
import { handleStartRoom } from './api.js';


document.addEventListener('DOMContentLoaded', async function() {
    let response;
    
    response = await getUsers();
    setAttribute(response);

    const getUsersInterval = setInterval(async function() {
        response = await getUsers();
        setAttribute(response);
        if (response.state === "PLAYING"){
            window.location.href = "../play/index.html"
        }
    }, 2000)

    const leaveButton = document.getElementById('butLeave');
    leaveButton.addEventListener('click', function() {
        
        clearInterval(getUsersInterval);
        console.log("Leave room")
    
        handleLeaveRoom();
    });

    const startButton = document.getElementById('butStart');
    startButton.addEventListener('click', function() {
        
        clearInterval(getUsersInterval);
        console.log("Start room")
    
        handleStartRoom();
    });
});

function setAttribute(response){

    document.getElementById("room").textContent = response.join_code;

    const users = response.users;
    for(let i = 1;i <= 9;i++){
        if(i - 1 < users.length){
            document.getElementById("player" + i).textContent = users[i-1].name;
        }else{
            document.getElementById("player" + i).textContent = "";
        }
    }
}
