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

const currentYear = today.getFullYear();
const currentMonth = today.getMonth();
const currentDay = today.getDay();
const currentDate = today.getDate();

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

if (
  currentMonth === 0 ||
  currentMonth === 2 ||
  currentMonth === 4 ||
  currentMonth === 6 ||
  currentMonth === 7 ||
  (currentMonth === 9) | (currentMonth === 11)
) {
  for (let i = 0; i <= 31; i++) {
    switch (i % 7) {
      case 1:
        for (let j = 0; j <= 4; j++) {
          dateContainer[j].children[5].innerText = 7 * j + 1;
        }
        break;
      case 2:
        for (let j = 0; j <= 4; j++) {
          dateContainer[j].children[6].innerText = 7 * j + 2;
        }
        break;
      case 3:
        for (let j = 0; j <= 4; j++) {
          dateContainer[j + 1].children[0].innerText = 7 * j + 3;
        }
        break;
      case 4:
        for (let j = 0; j <= 3; j++) {
          dateContainer[j + 1].children[1].innerText = 7 * j + 4;
        }
        break;
      case 5:
        for (let j = 0; j <= 3; j++) {
          dateContainer[j + 1].children[2].innerText = 7 * j + 5;
        }
        break;
      case 6:
        for (let j = 0; j <= 3; j++) {
          dateContainer[j + 1].children[3].innerText = 7 * j + 6;
        }
        break;
      case 0:
        for (let j = 0; j <= 3; j++) {
          dateContainer[j + 1].children[4].innerText = 7 * (j + 1);
        }
        break;
    }
  }
} else if (currentMonth === 1) {
} else {
}
// 현재 월의 마지막 날까지 날짜 표기하기 & 31일 / 30일 조건 추가
