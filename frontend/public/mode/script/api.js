import { BACKEND_URL } from "../../scripts/config.js"

export async function handleCreateRoom(gameMode){
    console.log("Enter handleCreateRoom")

    const token = localStorage.getItem("token");
    console.log(token);

    let check = false;

    const responseUser = await fetch(`${BACKEND_URL}/user`, {
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
            alert(r.json());
            console.error('Error fetching data:', r.status);
        }

    }).catch((error) => console.log(error));

    console.log(responseUser)
    const userName = responseUser.name;
    console.log(userName);

    const response = await fetch(`${BACKEND_URL}/game/room`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' + token
        },
        body: JSON.stringify({ name : new Date().toLocaleString(), gamemode_id : gameMode, max_size : 9 }),
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
        localStorage.setItem('roomcode', response.join_code);
        window.location.href = "../join/index.html"
    }
}