const startBtn = document.querySelector(".start-btn");
const container = document.querySelector(".container");
const randomNum = document.querySelector(".random-number");
const restartBtn = document.querySelector(".restart-btn");

const form = document.querySelector("form");
const input = document.querySelector("input");

const strike = document.getElementById("strike");
const ball = document.getElementById("ball");
const opportunity = document.getElementById("opportunity");

function makeRandomNum() {
  const num = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let a = 0;
  for (let i = 1; i < num.length; i++) {
    a = num[Math.floor(Math.random() * 8)];
  }
  let b = Math.floor(Math.random() * 9);
  let c = Math.floor(Math.random() * 9);
  const number = `${a}${b}${c}`;
  randomNum.innerText = number;
  return number;
}

function startGame() {
  container.style.display = "block";
  makeRandomNum();
}

function compareNum(first, second) {
  const firstArr = String(first).split("");
  const secondArr = String(second).split("");
  let strikes = 0;
  let balls = 0;
  for (let i = 0; i < firstArr.length; i++) {
    for (let j = 0; j < secondArr.length; j++) {
      if (i === j) {
        if (firstArr[i] === second[j]) {
          strikes++;
        }
      } else {
        if (firstArr[i] === second[j]) {
          balls++;
        }
      }
    }
  }
  strike.innerText = strikes;
  ball.innerText = balls;
  console.log(strikes);
  console.log(balls);
}

function init() {
  startGame();
  opportunity.innerText = 10;
  input.value = "";
}

startBtn.addEventListener("click", startGame);

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let userNum = input.value;
  const computerNum = randomNum.innerText;
  if (opportunity.innerText === "0") {
    alert("Game Over");
  } else {
    if (100 < userNum && userNum < 1000) {
      console.log(userNum);
      console.log(computerNum);
      compareNum(userNum, computerNum);
      opportunity.innerText--;
    } else {
      alert("세 자리 숫자를 입력하시오.");
    }
  }
});

restartBtn.addEventListener("click", init);
