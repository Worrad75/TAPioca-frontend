const backendURL = "http://localhost:3000/api/v1"
const bubblesContainer = document.querySelector("body > ul")
const bobaURL = "http://bobamade.com/wp-content/uploads/2018/09/cropped-Site-Icon2018-09-512x512.png"
const corgiURL = "https://media2.giphy.com/media/Kd5XdzdEhNqhYWe14S/source.gif"
const startButton = document.querySelector("#create")
const boba = document.querySelectorAll(".boba")
let counter = 0

fetch(`http://localhost:3000/api/v1/users`)
.then(resp => resp.json())
.then(console.log)

//Press start to create bubbles
startButton.addEventListener('click', e => {
    if(e.target.id === "create"){
        // debugger
        bubblesContainer.style.animation = "animation: circle 20s infinite;";
    }
})


function removeElement(elementId) {
    // Removes an element from the document
    // console.log(elementId)
    let element = document.querySelector(`[data-bub='${elementId}']`);
    // console.log(element[0])
    element.className = "matt"
    element.remove();
    // element[0].parentNode.removeChild(element[0]);
}

bubblesContainer.addEventListener("click", e => {
    console.log(e.target)
    if(e.target.className === "boba"){
        counter++
        // console.log("counter: " + counter)
        // debugger
        removeElement(e.target.dataset.id)
    }
})


