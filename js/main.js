/*----- constants -----*/
const COLORS = ["yellow", "red", "green", "blue"];

/*----- state variables -----*/
let gameSequence;
let playerSequence;
let level;
let canPlayAgain;

/*----- cached elements  -----*/
const startBtn = document.getElementById("start-btn");
const playAgainBtn = document.getElementById("play-again-btn");
const info = document.querySelector(".info");
const squares = document.querySelectorAll(".square");
const levelInfo = document.getElementById("level");
const boxes = {
  yellow: document.getElementById("yellow"),
  red: document.getElementById("red"),
  green: document.getElementById("green"),
  blue: document.getElementById("blue"),
};

/*----- event listeners -----*/
startBtn.addEventListener("click", startGame);
playAgainBtn.addEventListener("click", startGame);
squares.forEach((box) => {
  box.addEventListener("click", (e) => {
    // if canPlayAgain is false, then we don't want to be able to click any squares
    if (!canPlayAgain) return;
    else {
      let userChosenSequence = box.id; // red | yellow | blue ...
      playerSequence.push(userChosenSequence);
      const auId = box.getAttribute("data-box");
      playAudio(auId);
      playGame(playerSequence.length - 1);
    }
  });
});

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
  canPlayAgain = false;
}

// this uses randomSequence() to start the first round
function startGame() {
  init();
  canPlayAgain = true;
  startBtn.classList.add("hidden");
  info.classList.remove("hidden");
  info.textContent = "wait for the computer";
  levelInfo.classList.remove("hidden");

  randomSequence();
}

// this takes the randomly generated sequence from randomBoxFunc()
// pushes it into gameSequence array, increments the level, establishes playerSeq as an empty array
// calls playSquare to see the repeated old sequence, and then plays the newly generated random value
function randomSequence() {
  let oldPlayerSequence = playerSequence;
  playerSequence = [];
  level++;
  document.getElementById("level").innerHTML = level;
  let randomBox = randomBoxFunc();
  gameSequence.push(randomBox);

  if (oldPlayerSequence.length === 5 && gameSequence.length === 6) {
    info.textContent = "you win! congrats!";
    playAgainBtn.classList.remove("hidden");
    startBtn.classList.add("hidden");
    levelInfo.classList.add("hidden");
    canPlayAgain = false;
    return;
  } else {

    // play old the old playerSequence first
    playSquare(oldPlayerSequence, 0);
  }
  
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
  console.log("this is gameSequence", gameSequence);
  console.log("this is playerSequence", playerSequence);
  console.log("this is oldPlayerSequence", oldPlayerSequence);
  console.log("this is level", level);
}

// this takes the oldPlayerSequence and loops through it to show the entire sequence before adding
// a new random value to repeat per round
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

// this allows the player to keep playing the game if they are guessing the sequence correctly
// if they fail to guess it correctly and the playerSequence !== gameSequence, gameOver() is called
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

// this allows the player to start the game over if they lose
function gameOver() {
  level = 0;
  playerSequence = [];
  info.textContent = "you lost! try again";
  playAgainBtn.classList.remove("hidden");
  canPlayAgain = false;
}

// this makes the sounds work for both comp and player
function playAudio(id) {
  const audio = document.getElementById(id);
  audio.play();
}

// this makes sure that no values are repeated in order
// when generating the random gameSequence array
function randomBoxFunc() {
  let randomIndex = Math.floor(Math.random() * 4);
  let randomBox = COLORS[randomIndex]; // red | yellow | blue ...
  // if the previous color in randomBox = the next randomly generated color,
  // run the randomBoxFunc() again until a different color is generated.
  if (gameSequence[gameSequence.length - 1] === randomBox) {
    randomBox = randomBoxFunc();
  }
  return randomBox;
}
