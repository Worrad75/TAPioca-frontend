// const bobaURL = "http://bobamade.com/wp-content/uploads/2018/09/cropped-Site-Icon2018-09-512x512.png"
// const corgiURL = "https://media2.giphy.com/media/Kd5XdzdEhNqhYWe14S/source.gif"
const backendURL = "http://localhost:3000/api/v1"
const bubblesContainer = document.querySelector("body > ul")
const startButton = document.querySelector("#create")
const scoreNumber = document.querySelector("#number")
// const boba = document.querySelectorAll(".boba")
const timer = document.querySelector("#timer_div")
let counter = 0

//30 second timer for game 
function gameTimer(){
    let timeLeft = 30
    const timerId = setInterval(countdown, 1000)
    function countdown() {
        if (timeLeft == 0) {
            clearTimeout(timerId)
            doSomething(); //ADD FUNCtiON HERE FOR GETTING ANIMATIONS TO STOP / REPLAY BUTTON
        } else {
            timer.innerHTML = 'TIMER : ' + timeLeft
            timeLeft--
        }
    }
}

//start bubble animations 
function startAnimations(){
    let boba = document.getElementsByClassName('boba');
    for (var i = 0; i < boba.length; i++) {
        boba[i].classList.add('animate');
    }
}

//increase score counter
bubblesContainer.addEventListener("click", e => {
    if(e.target.className === "boba animate"){
        counter++
        scoreNumber.innerText = counter
        removeElement(e.target.dataset.id)
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




//EVENT LISTENERS =======================================-----

//begins bubble animation and timer on the click of a start button
document.getElementById('start').addEventListener('click', function () {
    startAnimations()
    gameTimer()
})




//FETCHES ---------------------------------------------------
fetch(`http://localhost:3000/api/v1/users`)
    .then(resp => resp.json())
    .then(console.log)


