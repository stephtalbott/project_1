/*----- constants -----*/
const SQUAREBOARD = ["yellow", "red", "blue", "green"]
const SQAURECOLORS = {
    yellow: "255, 255, 0, 50%", 
    red: "255, 0, 0, 50%",
    blue: "0, 0, 255, 50%", 
    green: "0, 128, 0, 50%"
}
const AUDIO = {
    yellow: "http://www.freesound.org/data/previews/42/42106_70164-lq.mp3",
    red: "http://www.freesound.org/data/previews/58/58277_634166-lq.mp3",
    blue: "http://www.freesound.org/data/previews/327/327666_5632380-lq.mp3",
    green: "http://www.freesound.org/data/previews/336/336899_4939433-lq.mp3"
}
/*----- state variables -----*/
let gameSequence 
let playerSequence 
// let gameMove 
let winner 

/*----- cached elements  -----*/
const startBtn = document.getElementById("start-button")
const playAgainBtn = document.getElementById("play-again-button")
const roundCounter = document.getElementById("round-counter")

/*----- event listeners -----*/
// document.getElementsByClassName("square-container").addEventListener('click', handleDrop) 
playAgainBtn.addEventListener("click", init)

/*----- functions -----*/
init() 

function init() {
    gameSequence = [], 
    playerSequence = [], 
    winner = null 

    // render()
}

function gameMove() {
    let gameSequence = [];
    let gameSeqArrayLength = 10;
    for (let i = 0; i < gameSeqArrayLength; i++) {
        let randomIndex = Math.floor(Math.random() * SQUAREBOARD.length); 
        gameSequence.push(SQUAREBOARD[randomIndex])
    }
   let i = 0; 
   let intervalId = setInterval(function() {
    console.log(gameSequence[i]); 
    i++; 
    if (i >= gameSequence.length) {
        clearInterval(intervalId);
    }
   }, 1000);
}

gameMove() 