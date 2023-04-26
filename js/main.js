/*----- constants -----*/
const COLORS = ["yellow", "red", "green", "blue"];

/*----- state variables -----*/

let gameSequence = []
let playerSequence = []
let level = 0
let maxTurns = 10
let turn
let winner 
let box
let color
/*----- cached elements  -----*/
const startBtn = document.getElementById("start-btn");
const playAgainBtn = document.getElementById("play-again-btn");
const info = document.querySelector(".info");
const roundCounter = document.getElementById("round-counter");


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

// this sets up the game
function init() {
  playAgainBtn.classList.add("hidden");
  info.classList.remove("hidden");
  info.textContent = "press start to begin!";
  turn = 1;
}

// this uses the random sequence to start the first round
function startGame() {
    startBtn.classList.add("hidden");
    info.classList.remove("hidden");
    info.textContent = "wait for the computer";
    randomSequence();
    playRound(0);
}

// this increments the level var and pushes the random sequence into the empty gameSequence array 
// function nextRound() {
//     level += 1; 
//     const nextInSequence = Array.from(gameSequence); 
//     nextInSequence.push(randomSequence()); 
// }

// this generates a 10-value random sequence to be displayed by the computer
function randomSequence() {
//   for (let i = 0; i < 10; i++) {
  let randomIndex = Math.floor(Math.random() * 4);
  gameSequence.push(COLORS[randomIndex]);
  //}
    let i = 0;
    let intervalId = setInterval(function () {
      //   console.log(gameSequence[i]);
      i++;
      if (i >= gameSequence.length) {
        clearInterval(intervalId);
      }
    // if (i === playerSequence.length) {
    //   clearInterval(intervalId);
    // }
    }, 1000);
  console.log("this is game Seq in randomSequence()", gameSequence);
}


// this passes in the current index of the gameSequence to flash/play sound of the appropriate square 
function playRound(currentIndex) {
    const color = gameSequence[currentIndex];
    const box = boxes[color];
    box.classList.add("active");
    const auId = box.getAttribute("data-box");
    playAudio(auId);
    setTimeout(() => {
    console.log('this is currentIndex', currentIndex)
    box.classList.remove("active");
    if (currentIndex === playerSequence.length) {
      console.log("correct");
    } else {
      setTimeout(playRound, 1500, (currentIndex += 1));
    }
  }, 1000);
  userClick();
}



// this listens for a user click to flash/play the appropriate audio 
// and stores each click in the playerSeq array but dang this is long and hard to manipulate :( 
// function userClick() {
//   const squares = document.querySelectorAll(".square");
//   squares.forEach((box) => {
//     box.addEventListener("click", (e) => {
//       const auId = box.getAttribute("data-box");
//       playAudio(auId);
//       playerSequence.push(e.target.id);
//       turn += 1;
//       console.log("playerSeq", playerSequence);
//       console.log("gameSeq", gameSequence);
//       if (gameSequence.length === playerSequence.length) {
//         randomSequence();
//       }
//       const clickedSquare = e.target.id;
//     //   console.log("this is clickedSquare", clickedSquare);
//       let currentIndex = 0;
//       const correctColor = gameSequence[currentIndex];
//     //   console.log("this is gameSequence[currentIndex]", gameSequence[currentIndex]);
//       if (clickedSquare === correctColor) {
//         playRound(currentIndex);
//       } else {
//         console.log("failed");
//         currentIndex = 0;
//       }
//     });
//   });
// }

// tried to break it into smaller functions 
function userClick() {
  const squares = document.querySelectorAll(".square");
  squares.forEach((box) => {
    box.addEventListener("click", (e) => {
      handleUserClick(box, e);
    });
  });
}

function handleUserClick(box, e) {
  const auId = box.getAttribute("data-box");
  playAudio(auId);
  playerSequence.push(e.target.id);
  turn += 1;
  console.log("playerSeq", playerSequence);
  console.log("gameSeq", gameSequence);
  if (gameSequence.length === playerSequence.length) {
    randomSequence();
  }
  checkUserClick(e.target.id);
}

function checkUserClick(clickedSquare) {
  let currentIndex = 0;
  const correctColor = gameSequence[currentIndex];
  if (clickedSquare === correctColor) {
    playRound(currentIndex);
  } else {
    console.log("failed");
    currentIndex = 0;
  }
}

// this makes the sounds work for both comp and player 
function playAudio(id) {
  const audio = document.getElementById(id);
  audio.play();
}

// to work on next:
// tracking the users clicks and putting them in an array 
// making sure the game increments based on guessing a round correctly 