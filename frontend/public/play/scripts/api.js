import { BACKEND_URL } from "../../scripts/config.js"

export async function getRoom(){

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


export async function getRoomState(){

    const token = localStorage.getItem('token');
    const roomCode = localStorage.getItem('roomcode')

    const responseJoin = await fetch(`${BACKEND_URL}/game/room/${roomCode}/state`, {
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

export async function handlePutUser(timepass, score, state){

    const token = localStorage.getItem('token');
    const roomCode = localStorage.getItem('roomcode')
    console.log({ timepass, score, state });

    const responseJoin = await fetch(`${BACKEND_URL}/game/room/${roomCode}/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + token
        },
        body: JSON.stringify({ timepass, score, state })
        
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