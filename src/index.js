const backendURL = "http://localhost:3000/api/v1"
const bubblesContainer = document.querySelector("body > ul")
const bobaURL = "http://bobamade.com/wp-content/uploads/2018/09/cropped-Site-Icon2018-09-512x512.png"
const corgiURL = "https://media2.giphy.com/media/Kd5XdzdEhNqhYWe14S/source.gif"
let counter = 0

fetch(`http://localhost:3000/api/v1/users`)
.then(resp => resp.json())
.then(console.log)



bubblesContainer.addEventListener("click", e => {
    console.log(e.target)
    // if(e.target.id === "boba1"){
        e.target.parentElement.removeChild()
    // }
})