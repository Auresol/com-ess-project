import { BACKEND_URL } from "../../scripts/config.js"

export async function handleJoinRoom(roomCode){
    console.log("Enter handleJoinRoom")

    const token = localStorage.getItem('token');
    console.log(token);

    let check = false;

    const responseJoin = await fetch(`${BACKEND_URL}/game/room/${roomCode}/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + token
        }
    }).then(r => {
        if (r.status >= 200 && r.status < 300) {
            // Process successful response (200-299 range)
            check = true;

            return r.json();
    
        } else {
            // Handle other errors based on status code
            alert(r.json());
            console.error('Error fetching data:', r.status);
        }

    }).catch((error) => console.log(error));


    if (check == true) {
        localStorage.setItem('roomcode', roomCode);
        window.location.href = "../join/index.html"
    }else{
        alert("Room doesn't exist");
    }

    // const response = await fetch(`${BACKEND_URL}/auth/login`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ email, password }),
    //   }).then(r => {
    //     if (r.status >= 200 && r.status < 300) {
    //         // Process successful response (200-299 range)
    //         r.json();
    //         check = true;
    
    //     } else {
    //         // Handle other errors based on status code
    //         alert(r.json());
    //         console.error('Error fetching data:', r.status);
    //     }
    //   }).catch((error) => console.log(error));
      
}