import { BACKEND_URL } from "../../scripts/config.js"

export async function handleLogin(email, password){
  var check = false;

  console.log("Enter handleLogin")
  console.log('email', email)

  let responsebody;

  const response = await fetch(`${BACKEND_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then((r) => {
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

  localStorage.setItem('token', response.token);

  if (check == true) {
    window.location.href = "../home/index.html"
  }
}
