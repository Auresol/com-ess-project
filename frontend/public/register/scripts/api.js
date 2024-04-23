import { BACKEND_URL } from "../../scripts/config.js";

export async function handleRegister(email, password, name){
  var check = false;

  console.log("Enter handleLogin")
  console.log('email', email)

  const role = "user";

  const response = await fetch(`${BACKEND_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, name, role }),
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
    localStorage.setItem('token', response.token);
    window.location.href = "../home/index.html"
  }
}

// export async function handleLogin(email, password, name){
//   console.log("Enter handleLogin")
//   console.log('email', email);
//   const role = "user";
//   const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFhYSIsIl9pZCI6IjY2MjU0ZjVhYWM4NDE2MGMyY2E0N2M2ZCIsImlhdCI6MTcxMzcyMTY1NSwiZXhwIjoxNzEzODA4MDU1fQ.XUS6h0fUzhBNNTSpVDqQmwNXljY6arLsI1_MtbZ_Jxg";
//   const response = await fetch('http://18.204.10.72:5000/auth/signup', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization' : 'Bearer ' + token;
//     },
//     body: JSON.stringify({ email, password, name, role }),
//   }).then((r) => r.json())
//     .catch((error) => console.log(error));
//   console.log(response);

//   const token = response.token;
//   localStorage.setItem('token', token);
  
//   console.log(response.token);
// }

