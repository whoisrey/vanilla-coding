const month = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];
const day = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const today = new Date();
const date = today.getDate();

let currentYear = today.getFullYear();
let currentMonth = today.getMonth();
let currentDay = today.getDay();
let currentDate = today.getDate();

const dayAndDate = document.querySelector(".day-date");
const clickedDay = document.getElementById("day");
const clickedDate = document.getElementById("date");
const monthAndYear = document.getElementById("month-year");

clickedDay.innerText = `${day[currentDay]}`;
clickedDate.innerText = `${currentDate}`;
monthAndYear.innerText = `${month[currentMonth]} ${currentYear}`;
// 현재 요일, 날짜, 월, 연도 표기

const calendarDay = document.getElementById("calendar-day");
const dayContainer = calendarDay.children;
const dayRow = dayContainer[0].children;

for (let i = 0; i < dayRow.length; i++) {
  dayRow[i].innerText = day[i];
}
// 요일 라벨링 표기

const calendarDate = document.getElementById("calendar-date");
const dateContainer = calendarDate.children;
const firstDay = (8 - (currentDate % 7) + currentDay) % 7;

dateContainer[0].children[firstDay].innerText = 1;
// 1일 판별 및 표기

const td = document.querySelectorAll("td");

if (
  currentMonth === 0 ||
  currentMonth === 2 ||
  currentMonth === 4 ||
  currentMonth === 6 ||
  currentMonth === 7 ||
  currentMonth === 9 ||
  currentMonth === 11
) {
  for (let i = 1; i <= 31; i++) {
    switch (i % 7) {
      case 1:
        td[i - 1 + firstDay].innerText = i;
      case 2:
        td[i - 1 + firstDay].innerText = i;
      case 3:
        td[i - 1 + firstDay].innerText = i;
      case 4:
        td[i - 1 + firstDay].innerText = i;
      case 5:
        td[i - 1 + firstDay].innerText = i;
      case 6:
        td[i - 1 + firstDay].innerText = i;
      case 0:
        td[i - 1 + firstDay].innerText = i;
    }
  }
}
if (
  currentMonth === 1 ||
  currentMonth === 3 ||
  currentMonth === 5 ||
  currentMonth === 8 ||
  currentMonth === 10
) {
  for (let i = 1; i <= 30; i++) {
    switch (i % 7) {
      case 1:
        td[i - 1 + firstDay].innerText = i;
      case 2:
        td[i - 1 + firstDay].innerText = i;
      case 3:
        td[i - 1 + firstDay].innerText = i;
      case 4:
        td[i - 1 + firstDay].innerText = i;
      case 5:
        td[i - 1 + firstDay].innerText = i;
      case 6:
        td[i - 1 + firstDay].innerText = i;
      case 0:
        td[i - 1 + firstDay].innerText = i;
    }
  }
}
for (let i = 0; i < td.length; i++) {
  td[i].addEventListener("click", () => {
    const clicked = td[i].innerText;
    clickedDate.innerText = clicked;
    switch (clicked % 7) {
      case 1:
        clickedDay.innerText = day[firstDay];
        break;
      case 2:
        clickedDay.innerText = day[(firstDay + 1) % 7];
        break;
      case 3:
        clickedDay.innerText = day[(firstDay + 2) % 7];
        break;
      case 4:
        clickedDay.innerText = day[(firstDay + 3) % 7];
        break;
      case 5:
        clickedDay.innerText = day[(firstDay + 4) % 7];
        break;
      case 6:
        clickedDay.innerText = day[(firstDay + 5) % 7];
        break;
      case 0:
        clickedDay.innerText = day[(firstDay + 6) % 7];
        break;
    }
  });
  // 클릭한 요일과 날짜 표기

  if (td[i].innerText == currentDate) {
    td[i].style.color = "red";
    td[i].style.fontWeight = "bold";
  }
}
// 현재 월의 마지막 날까지 날짜 표기하기 & 31일 / 30일 조건 추가 (수정))
// 현재 날짜에 색상 입히기

const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

prevBtn.addEventListener("click", () => {
  console.log("click");
});

nextBtn.addEventListener("click", () => {
  console.log("click");
});
// 달력의 전후버튼 추가
