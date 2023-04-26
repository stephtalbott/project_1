/*----- constants -----*/
const COLORS = ["yellow", "red", "green", "blue"];

/*----- state variables -----*/

let gameSequence = [];
let playerSequence = [];
let level;
let winner;
let box;
let color;
/*----- cached elements  -----*/
const startBtn = document.getElementById("start-btn");
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
startBtn.addEventListener("click", init);

/*----- functions -----*/

init();

function init() {
  (gameSequence = []), (playerSequence = []), (level = 0), (winner = null);
  startBtn.classList.add("hidden");
  info.classList.remove("hidden");
  info.textContent = "wait for the game";
  randomSequence();
}

function randomSequence() {
  //   for (let i = 0; i < 10; i++) {
  //     let randomIndex = Math.floor(Math.random() * 4);
  //     gameSequence.push(COLORS[randomIndex]);
  //   }
  let randomIndex = Math.floor(Math.random() * 4);
  gameSequence.push(COLORS[randomIndex]);

  //   let i = 0;
  //   let intervalId = setInterval(function () {
  //     //   console.log(gameSequence[i]);
  //     i++;
  //     if (i >= gameSequence.length) {
  //       clearInterval(intervalId);
  //     }
  //   }, 1000);
  console.log("this is game Seq", gameSequence);
}

function nextSequence(currentIndex) {
  const color = gameSequence[currentIndex];

  const box = boxes[color];

  box.classList.add("active");

  setTimeout(() => {
    // console.log('this is currentIndex', currentIndex)
    box.classList.remove("active");
  }, 1000);
  if (currentIndex === gameSequence.length - 1) {
    console.log("winner");
  } else {
    setTimeout(nextSequence, 1500, (currentIndex += 1));
  }
}
// nextSequence(0)

const squares = document.querySelectorAll(".square");
squares.forEach((box) => {
  box.addEventListener("click", (e) => {
    const auId = box.getAttribute("data-box");
    playAudio(auId);
    playerSequence.push(e.target.id);
    if (gameSequence.length === playerSequence.length) {
      console.log("PlayerSeq", playerSequence);
      console.log("gameSeq", gameSequence);
      randomSequence();
    }
    const clickedSquare = e.target.color;
    // const correctColor = gameSequence[currentIndex -1];
    // if (clickedSquare === correctColor) {
    //     // nextSequence();
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
