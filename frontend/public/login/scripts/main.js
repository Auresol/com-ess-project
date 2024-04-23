
import { handleLogin } from './api.js';
document.addEventListener('DOMContentLoaded', function() {
  const submitButton = document.getElementById('submit-button');
  submitButton.addEventListener('click', function() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('pass').value;

    if (email.trim() === '' || password.trim() === '') {
          alert('Please fill in all fields');
          return;
    }

    console.log("enter event listener")
    console.log('email', email);
    
    handleLogin(email, password);
  });
});

// import { handleLogin } from './api.js';

// function submitForm() {
//   var email = document.getElementById('email').value;
//   var password = document.getElementById('pass').value;

//   if (email.trim() === '' || password.trim() === '') {
//     alert('Please fill in all fields');
//     return;
//   }

//   console.log('Email:', email);
//   console.log('Password:', password);

//   handleLogin(email, password);
// }

// export { submitForm };