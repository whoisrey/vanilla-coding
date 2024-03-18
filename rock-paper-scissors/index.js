// const buttons = document.querySelectorAll("button");
// const computerChoice = document.querySelector(".computer-choice");
// const yourChoice = document.querySelector(".you-choice");

// const choices = ["✌🏼", "✊🏼", "🖐🏼"];
// const winner = document.querySelector(".result");

// // 결과값을 나타내는 함수
// const makeResult = (user, computer, message) => {
//   computerChoice.innerText = computer;
//   yourChoice.innerText = user;
//   winner.innerText = message;
// };

// // 게임의 조건을 정하는 함수
// const isWinner = (user, computer) => {
//   let message = "";
//   if (user === computer) {
//     message = "무승부";
//   } else {
//     switch (user + computer) {
//       case "✌🏼🖐🏼":
//       case "✊🏼✌🏼":
//       case "🖐🏼✊🏼":
//         message = "사용자승리";
//         break;
//       case "✌🏼✊🏼":
//       case "✊🏼🖐🏼":
//       case "🖐🏼✌🏼":
//         message = "컴퓨터승리";
//         break;
//     }
//   }
//   makeResult(user, computer, message);
// };

// // 컴퓨터와 유저가 선택을 하는 함수
// const makeDecision = (e) => {
//   const user = e.target.innerText;
//   const randomIndex = Math.floor(Math.random() * 3);
//   const computer = choices[randomIndex];
//   isWinner(user, computer);
// };

// buttons.forEach((button) => {
//   button.addEventListener("click", makeDecision);
// });

const buttons = document.querySelectorAll("button");
const decisions = ["✌🏼", "✊🏼", "🖐🏼"];

const computerChoice = document.querySelector(".computer-choice");
const userChoice = document.querySelector(".you-choice");
const winner = document.querySelector(".result");

const makeColor = (winner, message) => {
  switch (message) {
    case "user win!":
      winner.style.color = "blue";
      break;
    case "computer win!":
      winner.style.color = "red";
      break;
    default:
      winner.style.color = "black";
      break;
  }
};

const writeSth = (user, computer, message) => {
  computerChoice.innerText = computer;
  userChoice.innerText = user;
  winner.innerText = message;
  makeColor(winner, message);
};

const makeWinner = (user, computer) => {
  let message = "";
  if (user === computer) {
    message = "draw";
  } else {
    switch (user + computer) {
      case "✌🏼🖐🏼":
      case "✊🏼✌🏼":
      case "🖐🏼✊🏼":
        message = "user win!";
        break;
      case "✌🏼✊🏼":
      case "✊🏼🖐🏼":
      case "🖐🏼✌🏼":
        message = "computer win!";
        break;
    }
  }
  writeSth(user, computer, message);
};

const makeDecision = (e) => {
  const user = e.target.innerText;
  const randomIndex = Math.floor(Math.random() * 3);
  const computer = decisions[randomIndex];
  makeWinner(user, computer);
};

buttons.forEach((button) => {
  button.addEventListener("click", makeDecision);
});
