import { handleCreateRoom } from './api.js';

document.addEventListener('DOMContentLoaded', function() {
    const createRoomNormal = document.getElementById('createroom-normal');
    const createRoomQuote = document.getElementById('createroom-quote');
    const createRoomCoding = document.getElementById('createroom-coding');
    const createRoomEasy = document.getElementById('createroom-easy');
    const createRoomHard = document.getElementById('createroom-hard');

    createRoomNormal.addEventListener('click', function() {
  
      console.log("enter event listener")
      console.log("create room normal")
      
      handleCreateRoom("6627bfd74f172b4116f05f1b");
    });

    createRoomQuote.addEventListener('click', function() {
  
        console.log("enter event listener")
        console.log("create room quote")
        
        handleCreateRoom("6627569f232aa21f1368107d");
    });

    createRoomCoding.addEventListener('click', function() {
  
        console.log("enter event listener")
        console.log("create room coding")
        
        handleCreateRoom("662756f2232aa21f1368107f");
    });

    createRoomEasy.addEventListener('click', function() {
  
        console.log("enter event listener")
        console.log("create room easy")
        
        handleCreateRoom("66275714232aa21f13681081");
    });
    
    createRoomHard.addEventListener('click', function() {
  
        console.log("enter event listener")
        console.log("create room hard")
        
        handleCreateRoom("66275735232aa21f13681083");
    });
    
  });