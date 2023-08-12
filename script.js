const gamePad = document.getElementById("gamepad");
const timer = document.getElementById("timer");
const scoreboard = document.getElementById("score");

let target = 0;
let remainingTime = 30;
let score = 0;

// for generating numbers between 0 to 9;
const getRandomNumber = () => {
  const randomNumber = Math.floor(Math.random() * 10);
  return randomNumber;
};

// will refresh the numbers on the board
const refreshBoard = () => {
  let gamepadText = "";
  for (let i = 0; i < 168; i++) {
    const rn = getRandomNumber();
    gamepadText += `<div class="bubble">${rn}</div>`;
  }
  gamepad.innerHTML = gamepadText;
};

// for setting target
const setTarget = () => {
  const elem = document.getElementById("target");
  target = getRandomNumber();
  elem.innerText = target;
};

// will run the timer
const reduceTime = () => {
  var timerInt = setInterval(() => {
    if (remainingTime > 0) {
      remainingTime--;
      timer.textContent = remainingTime;
    } else {
      clearInterval(timerInt);
      gamepad.innerHTML = `<div className="game-over">  <h1>Game Over</h1> 
      <h2>Your Score is ${score}</h2>
      </div>`;
    }
  }, 1000);
};

// the game starts here
setTarget();
reduceTime();
refreshBoard();

// will listen if any bubble is clicked
gamePad.addEventListener("click", (event) => {
  const clickedNumber = parseInt(event.target.innerHTML);
  if (clickedNumber === target) {
    score += 10;
    scoreboard.innerText = score;
    refreshBoard();
    setTarget();
  } else if (clickedNumber !== target && score > 0) {
    score -= 10;
    scoreboard.innerText = score;
    refreshBoard();
    setTarget();
  }
});
