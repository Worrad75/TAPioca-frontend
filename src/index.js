const backendURL = "http://localhost:3000/api/v1"

fetch(`http://localhost:3000/api/v1/users`)
.then(resp => resp.json())
.then(console.log)