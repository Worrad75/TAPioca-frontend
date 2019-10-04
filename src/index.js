let counter = 0
let userData = []
let gameData = []
let scoreData = []
let currentUsername = ""
let gameMusic = new Audio("assets/backgroundGameMusic.mp3")


getData();
createBubbles();
scoreBoardContainer.style.display = "none"; 
ninjaImage.style.display = "none";
corgiImage.style.display = "inline";



// -----------------------   FUNCTIONS   ----------------------------

function getRandomInt(min,max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max-min)) + min; 
}


function createBubbles(){
    for(let i=1; i<50; i++){
        let widthHeight = getRandomInt(50,110)
        let left = getRandomInt(10,90)
        let delay = getRandomInt(2,15)
        let duration = getRandomInt(6,20)

        let bubbleInfo = `
        <li class="boba" id="${i}" data-bubble-id="boba${i}"></li>
        `
        bubblesContainer.insertAdjacentHTML('beforeend', bubbleInfo)
        let newBoba = bubblesContainer.lastElementChild
        newBoba.style.width = `${widthHeight}px`;
        newBoba.style.height = `${widthHeight}px`;
        newBoba.style.left = `${left}%`;
        newBoba.style.animationDelay = `${delay}s`;
        newBoba.style.animationDuration = `${duration}s`;
    }


}

//TIMER
function gameTimer(){
    let timeLeft = 25; 
    const timerId = setInterval(countdown, 1000)
    function countdown() {
        if (timeLeft == -1) {
            clearTimeout(timerId)
            endAnimations();
            addScore(counter)
                .then((response) => {
                    gameData.push(response.game)
                    scoreData.push(response.score)
                })
                .then(getScores)
            
        } else {
            timer.innerHTML = 'TIMER : ' + timeLeft
            timeLeft--
        }
    }
}

function startAnimations(){
    gameMusic.play();
    gameMusic.loop = true;
    let boba = document.getElementsByClassName('boba');
    for (var i = 0; i < boba.length; i++) {
        boba[i].classList.add('animate');
    }
    ninjaImage.style.display = "inline";
    corgiImage.style.display = "none";
    ninjaImage.classList.add('animated', 'bounceInRight', 'custom-animate')
}

function endAnimations() {
    gameMusic.pause(); 
    let boba = document.getElementsByClassName('boba');
    for (var i = 0; i < boba.length; i++) {
        boba[i].classList.remove('animate');
    }
    scoreBoardContainer.style.display = "inline";
    ninjaImage.style.display = "none";
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
    for (let i = 0; i < 5; i++) {
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
    if(e.target.id === "ninja"){
        counter = counter + 5
        scoreNumber.innerText = counter 
    }

}

function replayGame(e){
    if(e.target.className==="replay"){
        scoreBoardContainer.style.display = "none"; 
        startAnimations();
        gameTimer(); 
        counter = 0; 
        scoreNumber.innerText = 0; 

        let elements = document.querySelectorAll(".boba")
        elements.forEach(ele => {
            ele.style.display = "inline";
        })
    }
}


function changeUser(e){
    if(e.target.className==="changeUser"){
        scoreBoardContainer.style.display = "none"; 
        userFormDiv.style.display = "inline";
        scoreNumber.innerText = 0;
    }
}


function renderCurrentUser(user) {
    currentUsername = user.username
    document.querySelector("h6").innerHTML = `CURRENT TAPPER: <br><br> ${currentUsername}`
    userFormDiv.style.display = "none";
}

function bubbleSound(e){
    if (e.target.className === "boba animate" || e.target.id === "ninja") {
        let bubbleSound = new Audio("assets/bubblePop.mp3")
        bubbleSound.play();
        bubbleSound.currentTime=0; 
    }
}

// -----------------------   EVENT LISTENERS   ----------------------------



userFormDiv.addEventListener("submit", function () {
    startAnimations()
    gameTimer()
    // Uncomment if start button is desired
    // if(!startButton.disabled){
    //     startButton.innerText = "PLAYING!"
    //     startButton.disabled = !startButton.disabled 
    // }
})

bubblesContainer.addEventListener("click", e => {
    scoreCounter(e)
    bubbleSound(e)
    removeElement(e.target.dataset.bubbleId)
    if(e.target.id === "ninja"){
        ninjaImage.style.display = "none";
    }
})

scoreBoardContainer.addEventListener('click', e=> {
    replayGame(e);
    changeUser(e);
})


userFormDiv.addEventListener("submit", e => {
    e.preventDefault();
    const username = e.target.username.value
    addUser(username)
        .then(renderCurrentUser)
        .then(getUsers)
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
        .then(displayLeaderboard)
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

function addScore(newScore) {
    const configOBJ = {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify({
            tally: newScore,
            username: currentUsername
        })
    }
    return fetch(`${backendURL}/scores`, configOBJ)
        .then(resp => resp.json())
}

