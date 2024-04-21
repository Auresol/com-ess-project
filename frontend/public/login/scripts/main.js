import { handleLogin } from './api.js';
document.addEventListener('DOMContentLoaded', function() {
  const submitButton = document.getElementById('submit-button');
  submitButton.addEventListener('click', function() {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    console.log("enter event listener")
    console.log('email', email.value);
    
    handleLogin(email.value, password.value);
  });
});
