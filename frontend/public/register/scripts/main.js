
import { handleRegister } from './api.js';
document.addEventListener('DOMContentLoaded', function() {
  const submitButton = document.getElementById('submit-button');
  submitButton.addEventListener('click', function() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('pass').value;
    const username = document.getElementById('name').value;

    if (email.trim() === '' || password.trim() === '' || username.trim() === '') {
          alert('Please fill in all fields');
          return;
    }

    console.log("enter event listener")
    console.log('email', email);

    handleRegister(email, password, username);
  });
});


// import { handleLogin } from './api.mjs';

// function submitForm() {
//   var email = document.getElementById('email').value;
//   var password = document.getElementById('pass').value;
//   var username = document.getElementById('name').value;

//   if (email.trim() === '' || password.trim() === '' || username.trim() === '') {
//     alert('Please fill in all fields');
//     return;
//   }

//   console.log('Email:', email);
//   console.log('Password:', password);
//   console.log('Username:', username);

//   handleLogin(email, password, username);
// }
