/*----- constants -----*/
const COLORS = ["yellow", "red", "blue", "green"]

/*----- state variables -----*/


let gameSequence 
let playerSequence 
let level
let winner 
let box 
let color 
/*----- cached elements  -----*/
const startBtn = document.getElementById("start-btn")
const info = document.querySelector(".info")
const roundCounter = document.getElementById("round-counter")

const yellowBox = document.getElementById("yellow")
const redBox = document.getElementById("red")
const greenBox = document.getElementById("green")
const blueBox = document.getElementById("blue")

const boxes = {
    yellow: yellowBox, 
    red: redBox, 
    blue: blueBox, 
    green: greenBox
}


/*----- event listeners -----*/
startBtn.addEventListener("click", init)

/*----- functions -----*/


init() 

function init() {
    gameSequence = [], 
    playerSequence = [], 
    level = 0,
    winner = null; 
    randomSequence(); 

}



function randomSequence() {
    for (let i = 0; i < 10; i++) {
        let randomIndex = Math.floor(Math.random() * 4);
       gameSequence.push(COLORS[randomIndex]);
      }
      
      let i = 0; 
         let intervalId = setInterval(function() {
          console.log(gameSequence[i]); 
          i++; 
          if (i >= gameSequence.length) {
              clearInterval(intervalId);
          }
         }, 1000);
    console.log("this is game Seq", gameSequence)
} 


function nextSequence(currentIndex) {
    // console.log('this is color array', boxes);
    console.log('this is currentIndex', currentIndex)
    color = gameSequence[currentIndex]; 
    console.log('this is the color', color)
    box = boxes[color];
    console.log('this is box before add active', box);
        box.classList.add("active"); 
    console.log('this is box after add active', box);
    setTimeout(() => {
        // console.log('this is currentIndex', currentIndex)
        console.log('this is box in settimeout before remove active', box)
        box.classList.remove("active"); 
        console.log('this is box in settimeout after remove active', box) 
    }, 1000)
    if (currentIndex === gameSequence.length) {
        console.log("winner"); 
    } else {
        setTimeout(nextSequence, 1500, currentIndex+=1)
    }
}
nextSequence(0) 

const squares = document.querySelectorAll(".square")

// squares.forEach(box => {
//     box.addEventListener("click", e => {
//         const clickedSquare = e.target.color; 
//         const correctColor = gameSequence[currentIndex -1];
//         if (clickedSquare === correctColor) {
//             nextSequence();
//         } else {
//             console.log("failed");
//             currentIndex = 0;
//         } 
//     })
// })