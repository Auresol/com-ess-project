import { BACKEND_URL } from "../../scripts/config.js"

export async function getUsers(){

    const token = localStorage.getItem('token');
    const roomCode = localStorage.getItem('roomcode')

    const responseJoin = await fetch(`${BACKEND_URL}/game/room/${roomCode}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + token
        }
    }).then(r => {
        if (r.status >= 200 && r.status < 300) {
            // Process successful response (200-299 range)
            return r.json();
    
        } else {
            // Handle other errors based on status code
            console.error('Error fetching data:', r.status);
        }

    }).catch((error) => console.log(error));

    return responseJoin;
}


export async function handleLeaveRoom(){
    console.log("Enter handleLeaveRoom")

    const token = localStorage.getItem('token');
    const roomCode = localStorage.getItem('roomcode')
    console.log(token);
    console.log(roomCode);

    let check = false;
    let responsebody;

    const response = await fetch(`${BACKEND_URL}/game/room/${roomCode}/leave`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + token
        }
    }).then(r => {
        if (r.status >= 200 && r.status < 300) {
            // Process successful response (200-299 range)
            responsebody = r.json();
            check = true;

        } else {
            // Handle other errors based on status code
            alert(r.json());
            console.error('Error fetching data:', r.status);
        }
    }).catch((error) => console.log(error));

    if (check == true) {
        window.location.href = "../home/index.html"
    }
}


export async function handleStartRoom(){
    console.log("Enter handleStartRoom")

    const token = localStorage.getItem('token');
    const roomCode = localStorage.getItem('roomcode')
    console.log(token);
    console.log(roomCode);

    let check = false;
    let responsebody;

    const response = await fetch(`${BACKEND_URL}/game/room/${roomCode}/start`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + token
        }
    }).then(r => {
        if (r.status >= 200 && r.status < 300) {
            // Process successful response (200-299 range)
            responsebody = r.json();
            check = true;

        } else {
            // Handle other errors based on status code
            alert(r.json());
            console.error('Error fetching data:', r.status);
        }
    }).catch((error) => console.log(error));

    if (check == true) {
        window.location.href = "../play/index.html"
    }
}
