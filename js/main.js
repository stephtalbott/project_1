/*----- constants -----*/
const COLORS = ["yellow", "red", "green", "blue"];

/*----- state variables -----*/

let gameSequence;
let playerSequence;
let level;

/*----- cached elements  -----*/
const startBtn = document.getElementById("start-btn");
const playAgainBtn = document.getElementById("play-again-btn");
const info = document.querySelector(".info");

const boxes = {
  yellow: document.getElementById("yellow"),
  red: document.getElementById("red"),
  green: document.getElementById("green"),
  blue: document.getElementById("blue"),
};

/*----- event listeners -----*/
startBtn.addEventListener("click", startGame);
playAgainBtn.addEventListener("click", startGame);
/*----- functions -----*/

init();

// this sets up the game
function init() {
  playAgainBtn.classList.add("hidden");
  info.classList.remove("hidden");
  info.textContent = "press start to begin!";
  level = 0;
  playerSequence = [];
  gameSequence = [];
}

// this uses the random sequence to start the first round
function startGame() {
  init();
  startBtn.classList.add("hidden");
  info.classList.remove("hidden");
  info.textContent = "wait for the computer";
  randomSequence();
  //   playRound(0);
}

// this generates a 10-value random sequence to be displayed by the computer
function randomSequence() {
  let oldPlayerSequence = playerSequence;
  playerSequence = [];
  level++;
  document.getElementById("level").innerHTML = level;
  let randomBox = randomBoxFunc();
  gameSequence.push(randomBox);

  // play old records first
  //playOld(oldPlayerSequence);

  playSquare(oldPlayerSequence, 0);

  setTimeout(() => {
    let box = document.querySelector(`#${randomBox}`);
    box.classList.add("active");
    const auId = box.getAttribute("data-box");
    playAudio(auId); // play new record
    setTimeout(() => {
      box.classList.remove("active");
      info.textContent = "your turn";
    }, 500);
  }, gameSequence.length * 500);
}

function playSquare(oldPlayerSequence, i) {
  if (i === oldPlayerSequence.length) return;

  let el = oldPlayerSequence[i];
  let box = document.querySelector(`#${el}`);
  box.classList.add("active");
  playAudio("audio_" + el); // e.g audio_red | audio_yellow ...
  info.textContent = "watch for the pattern";
  setTimeout(() => {
    box.classList.remove("active");
  }, 500);

  setTimeout(() => {
    return playSquare(oldPlayerSequence, i + 1);
  }, 500);
}

const squares = document.querySelectorAll(".square");
squares.forEach((box) => {
  box.addEventListener("click", (e) => {
    let userChosenSequence = box.id; // red | yellow | blue ...
    playerSequence.push(userChosenSequence);
    const auId = box.getAttribute("data-box");
    playAudio(auId);
    playGame(playerSequence.length - 1);
  });
});

function playGame(currentLevel) {
  if (gameSequence[currentLevel] === playerSequence[currentLevel]) {
    if (playerSequence.length === gameSequence.length) {
      setTimeout(() => {
        randomSequence();
      }, 1000);
    }
  } else {
    gameOver();
  }
}

function gameOver() {
  level = 0;
  playerSequence = [];
  info.textContent = "you lost! try again";
  playAgainBtn.classList.remove("hidden");
}

// this makes the sounds work for both comp and player
function playAudio(id) {
  const audio = document.getElementById(id);
  audio.play();
}

function randomBoxFunc() {
  let randomIndex = Math.floor(Math.random() * 4);
  let randomBox = COLORS[randomIndex]; // red | yellow | blue ...
  if (gameSequence[gameSequence.length - 1] === randomBox) {
    randomBox = randomBoxFunc();
  }
  return randomBox;
}

// to work on next:
// tracking the users clicks and putting them in an array
// making sure the game increments based on guessing a round correctly
