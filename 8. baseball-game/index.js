const startBtn = document.querySelector(".start-btn");
const container = document.querySelector(".container");
const randomNum = document.querySelector(".random-number");
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

startBtn.addEventListener("click", startGame);

const form = document.querySelector("form");
const input = document.querySelector("input");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let userNum = input.value;
  const computerNum = randomNum.innerText;
  if (100 < userNum && userNum < 1000) {
    console.log(userNum);
    console.log(computerNum);
  } else {
    alert("세 자리 숫자를 입력하시오.");
    userNum = "";
  }
});
