/*----- constants -----*/
const COLORS = ["yellow", "red", "green", "blue"];

/*----- state variables -----*/

let gameSequence = [];
let playerSequence = [];
let level = 0;
let winner 
let box;
let color;
/*----- cached elements  -----*/
const startBtn = document.getElementById("start-btn");
const playAgainBtn = document.getElementById("play-again-btn");
const info = document.querySelector(".info");
const roundCounter = document.getElementById("round-counter");

const sounds = {
  yellow: new Audio(
    "http://www.freesound.org/data/previews/42/42106_70164-lq.mp3"
  ),
  red: new Audio(
    "http://www.freesound.org/data/previews/58/58277_634166-lq.mp3"
  ),
  green: new Audio(
    "http://www.freesound.org/data/previews/336/336899_4939433-lq.mp3"
  ),
  blue: new Audio(
    "http://www.freesound.org/data/previews/327/327666_5632380-lq.mp3"
  ),
};

const boxes = {
  yellow: document.getElementById("yellow"),
  red: document.getElementById("red"),
  green: document.getElementById("green"),
  blue: document.getElementById("blue"),
};

/*----- event listeners -----*/
startBtn.addEventListener("click", startGame);
// playAgainBtn.addEventListener("click", )
/*----- functions -----*/

init();

function init() {
  playAgainBtn.classList.add("hidden");
  info.classList.remove("hidden");
  info.textContent = "press start to begin!";
}

function startGame() {
    startBtn.classList.add("hidden");
    info.classList.add("hidden");
    randomSequence();
    playRound(0);
}

function nextRound() {
    level += 1; 
    const nextInSequence = Array.from(gameSequence); 
    nextInSequence.push(randomSequence()); 
}

function randomSequence() {
  for (let i = 0; i < 10; i++) {
  let randomIndex = Math.floor(Math.random() * 4);
  gameSequence.push(COLORS[randomIndex]);
  }
    let i = 0;
    let intervalId = setInterval(function () {
      //   console.log(gameSequence[i]);
      i++;
      if (i >= gameSequence.length) {
        clearInterval(intervalId);
      }
    }, 1000);
  console.log("this is game Seq", gameSequence);
}

function playRound(currentIndex) {
  const color = gameSequence[currentIndex];
  const box = boxes[color];
  box.classList.add("active");
  const auId = box.getAttribute("data-box");
  playAudio(auId);
  setTimeout(() => {
    // console.log('this is currentIndex', currentIndex)
    box.classList.remove("active");
    if (currentIndex === gameSequence.length - 1) {
      console.log("winner");
    } else {
      setTimeout(playRound, 1500, (currentIndex += 1));
    }
  }, 1000);
  
}

const squares = document.querySelectorAll(".square");
squares.forEach((box) => {
  box.addEventListener("click", (e) => {
    const auId = box.getAttribute("data-box");
    playAudio(auId);
    playerSequence.push(e.target.id);

    console.log("PlayerSeq", playerSequence);
    console.log("gameSeq", gameSequence);
    if (gameSequence.length === playerSequence.length) {
      
      randomSequence();
    }
    const clickedSquare = e.target.color;
    // const correctColor = gameSequence[currentIndex -1];
    // if (clickedSquare === correctColor) {
    //     // playRound();
    // } else {
    //     console.log("failed");
    //     currentIndex = 0;
    // }
  });
});

function playAudio(id) {
  const audio = document.getElementById(id);
  audio.play();
}

// to work on next:
// tracking the users clicks and putting them in an array 
// making sure the game increments based on guessing a round correctly 