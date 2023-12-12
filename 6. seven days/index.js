const table = document.querySelector("table");
const days = ["일", "월", "화", "수", "목", "금", "토"];
const th = document.querySelectorAll("th");
const button = document.querySelector("button");
const date = new Date();
const day = date.getDay();

const tbody = document.querySelectorAll("tbody");

for (let i = 0; i < 7; i++) {
  th[i].innerText = days[i];
}

for (let j = 0; j < 30; j++) {
  th[j + day + 7].innerText += j + 1;
}
