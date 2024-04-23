import { handleJoinRoom } from './api.js';

document.addEventListener('DOMContentLoaded', function() {
    const roomCodeBlock = document.getElementById('roomcode');

    roomCodeBlock.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault()

            console.log('Enter key pressed!');

            var roomCode = roomCodeBlock.value;

            if (roomCode.trim() === '') {
                alert('Please fill room code');
                return;
            }

            handleJoinRoom(roomCode);
        }
    });
});