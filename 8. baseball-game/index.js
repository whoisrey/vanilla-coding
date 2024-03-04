const startBtn = document.querySelector(".start-btn");
const container = document.querySelector(".container");

startBtn.addEventListener("click", function () {
  container.style.display = "block";
  const num = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let a = 0;
  for (let i = 1; i < num.length; i++) {
    a = num[Math.floor(Math.random() * 8)];
  }
  let b = Math.floor(Math.random() * 9);
  let c = Math.floor(Math.random() * 9);
  const randomNum = `${a}${b}${c}`;
  console.log(randomNum);
});
