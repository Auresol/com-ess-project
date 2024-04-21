
export async function handleLogin(email, password){
  console.log("Enter handleLogin")
  console.log('email', email);
  const response = await fetch('http://localhost:5000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then((r) => r.json())
    .catch((error) => console.log(error));

  const token = response.token;
  localStorage.setItem('token', token);
  
  console.log(response.token);
}

