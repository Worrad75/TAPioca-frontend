// const bobaURL = "http://bobamade.com/wp-content/uploads/2018/09/cropped-Site-Icon2018-09-512x512.png"
// const corgiURL = "https://media2.giphy.com/media/Kd5XdzdEhNqhYWe14S/source.gif"
const backendURL = "http://localhost:3000/api/v1"
const bubblesContainer = document.querySelector("body > ul")
const startButton = document.querySelector("#start")
const replayButton = document.querySelector("#container > div > a")
const scoreNumber = document.querySelector("#number")
const timer = document.querySelector("#timer_div")
const scoreBoardContainer = document.querySelector("#container")

let counter = 0
let userData = []
let gameData = []
let scoreData = []

//have the scoreboard not display from the beginning
scoreBoardContainer.style.display = "none"; 

//30 second timer for game 
function gameTimer(){
    let timeLeft = 5
    const timerId = setInterval(countdown, 1000)
    function countdown() {
    if (timeLeft == -1) {
        clearTimeout(timerId)
        endAnimations();
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

function endAnimations() {
    let boba = document.getElementsByClassName('boba');
    for (var i = 0; i < boba.length; i++) {
        boba[i].classList.remove('animate');
    }
    displayLeaderboard();
    //at the end of the animation display the scoreboard 
    scoreBoardContainer.style.display = "inline";
}

function displayLeaderboard() {
    getUsers()
    getGames()
    getScores()
}


function sortScores() {
    let scoresCopy = scoreData.map(score => {
        return score
    })
    return scoresCopy.sort((a, b) => (a.tally < b.tally) ? 1 : -1)
}


//NEED TO FIXXXXXXXXXXXX FXN
function removeElement(boba) {
    // Removes an element from the document
    let element = document.querySelector(`[data-bub='${boba}']`);
    element.display = "none"
    // element.parentNode.removeChild(element);
}

function scoreCounter(e){
    if (e.target.className === "boba animate") {
        counter++
        scoreNumber.innerText = counter
    }
}

//reset game 
function replayGame(e){
    if(e.target.className==="replay"){
        scoreBoardContainer.style.display = "none"; 
        startAnimations();
        gameTimer(); 
        scoreNumber.innerText = 0; 
    }
}

//EVENT LISTENERS =======================================-----

//begins bubble animation and timer on the click of a start button
document.getElementById('start').addEventListener('click', function () {
    startAnimations()
    gameTimer()
    if(!startButton.disabled){
        startButton.innerText = "PLAYING!"
        startButton.disabled = !startButton.disabled 
    }
})


//increase score counter
bubblesContainer.addEventListener("click", e => {
    scoreCounter(e)
    // removeElement(e.target.dataset.bub)
})

//replay the game
scoreBoardContainer.addEventListener('click', e=> {
    replayGame(e);
})


//FETCHES ---------------------------------------------------
function getUsers() {
    userData = []
    fetch(`http://localhost:3000/api/v1/users`)
    .then(resp => resp.json())
    .then(users => {
        users.forEach(user => {
            userData.push(user)
        })
    })
}

function getGames() {
    gameData = []
    fetch(`http://localhost:3000/api/v1/games`)
    .then(resp => resp.json())
    .then(games => {
        games.forEach(game => {
            gameData.push(game)
        })
    })
}

function getScores() {
    scoreData = []
    fetch(`http://localhost:3000/api/v1/scores`)
        .then(resp => resp.json())
        .then(scores => {
            scores.forEach(score => {
                scoreData.push(score)
            })
        })
}

