const backendURL = "http://localhost:3000/api/v1"
const canvasContainer = document.querySelector("#particles-js-two")
const bobaURL = "http://bobamade.com/wp-content/uploads/2018/09/cropped-Site-Icon2018-09-512x512.png"
const corgiURL = "https://media2.giphy.com/media/Kd5XdzdEhNqhYWe14S/source.gif"
let counter = 0

fetch(`http://localhost:3000/api/v1/users`)
.then(resp => resp.json())
.then(console.log)



canvasContainer.addEventListener("click", e => {
    // let bobaClick = particleBoba.interactivity.events.onclick.mode
    debugger    
    if (bobaClick === "repulse") {

        counter++
        console.log(counter)
        console.log(e.target)

    }
})