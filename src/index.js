let counter = 0
let userData = []
let gameData = []
let scoreData = []
let currentUsername = ""


getData();
scoreBoardContainer.style.display = "none"; 



// -----------------------   FUNCTIONS   ----------------------------

//TIMER
function gameTimer(){
    let timeLeft = 5
    const timerId = setInterval(countdown, 1000)
    function countdown() {
    if (timeLeft == -1) {
        clearTimeout(timerId)
        endAnimations();
        displayLeaderboard();
    } else {
        timer.innerHTML = 'TIMER : ' + timeLeft
        timeLeft--
        }
    }
}

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
    scoreBoardContainer.style.display = "inline";
}

function getData() {
    getUsers()
    getGames()
    getScores()
}

function displayLeaderboard() {
    leaderboardBody.innerHTML = ""
    let sortedScores = sortScores()
    renderSortedScores(sortedScores)
}

function renderSortedScores(sortedScores) {
    for (let i = 0; i < sortedScores.length; i++) {

        console.log(i)

        renderOneScore(sortedScores[i], i)
    }
}

function renderOneScore(score,index) {
    let gameMatch = gameData.find(game => {
        return parseInt(game.score_id) === parseInt(score.id)
    })
    let userMatch = userData.find(user => {
        return parseInt(gameMatch.user_id) === parseInt(user.id)
    })
    const str = `
        <tr>
            <th>${index+1}</th>
            <th>${userMatch.username}</th>
            <th>${score.tally}</th>
        </tr>`
    leaderboardBody.insertAdjacentHTML("beforeend", str)
}

function sortScores() {
    let scoresCopy = scoreData.map(score => {
        return score
    })
    return scoresCopy.sort((a, b) => (a.tally < b.tally) ? 1 : -1)
}

function removeElement(boba) {
    let element = document.querySelector(`[data-bubble-id='${boba}']`);
    if (element) {
        element.style.display = "none";
    }
}

function scoreCounter(e){
    if (e.target.className === "boba animate") {
        counter++
        scoreNumber.innerText = counter
    }
}

function replayGame(e){
    if(e.target.className==="replay"){
        scoreBoardContainer.style.display = "none"; 
        startAnimations();
        gameTimer(); 
        scoreNumber.innerText = 0; 
    }
}

function renderCurrentUser(username) {
    currentUsername = username
    userFormDiv.style.display = "none";
}


// -----------------------   EVENT LISTENERS   ----------------------------

//begins bubble animation and timer on the click of a start button
document.getElementById('start').addEventListener('click', function () {
    startAnimations()
    gameTimer()
    if(!startButton.disabled){
        startButton.innerText = "PLAYING!"
        startButton.disabled = !startButton.disabled 
    }
})

bubblesContainer.addEventListener("click", e => {
    scoreCounter(e)
    removeElement(e.target.dataset.bubbleId)
})

scoreBoardContainer.addEventListener('click', e=> {
    replayGame(e);
})


userFormDiv.addEventListener("submit", e => {
    e.preventDefault();
    const username = e.target.username.value
    addUser(username).then(renderCurrentUser(username))
})


// -----------------------   FETCHES   ----------------------------
function getUsers() {
    userData = []
    return fetch(`http://localhost:3000/api/v1/users`)
    .then(resp => resp.json())
    .then(users => {
        users.forEach(user => {
            return userData.push(user)
        })
    })
}

function getGames() {
    gameData = []
    return fetch(`http://localhost:3000/api/v1/games`)
    .then(resp => resp.json())
    .then(games => {
        games.forEach(game => {
            return gameData.push(game)
        })
    })
}

function getScores() {
    scoreData = []
    return fetch(`http://localhost:3000/api/v1/scores`)
        .then(resp => resp.json())
        .then(scores => {
            scores.forEach(score => {
                return scoreData.push(score)
            })
        })
    
}

function addUser(newUsername) {
    const configOBJ = {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({
            id: userData.length,
            username: newUsername
        })
    }
    return fetch(`${backendURL}/users`, configOBJ)
        .then(resp => resp.json())
}