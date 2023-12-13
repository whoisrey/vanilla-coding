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
const td = document.querySelectorAll("td");
let firstDay = (8 - (currentDate % 7) + currentDay) % 7;

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
// 현재 월의 마지막 날까지 날짜 표기하기 (수정)

for (let i = 0; i < td.length; i++) {
  if (td[i].innerText) {
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
  }
  // 클릭한 요일과 날짜 표기

  if (td[i].innerText == currentDate) {
    td[i].style.color = "red";
    td[i].style.fontWeight = "bold";
  }
}
// 현재 날짜에 색상 입히기

const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

prevBtn.addEventListener("click", () => {
  init();
  if (currentMonth === 0) {
    currentMonth = 11;
    currentYear = currentYear - 1;
  } else {
    currentMonth = Math.abs((1 - currentMonth) % 12);
  }
  if (firstDay === 0) {
    firstDay = 7;
    firstDay = firstDay - 1;
  } else {
    firstDay = Math.abs((1 - firstDay) % 7);
  }
  monthAndYear.innerText = `${month[currentMonth]} ${currentYear}`;
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
});

nextBtn.addEventListener("click", () => {
  init();
  currentMonth = (currentMonth + 1) % 12;
  if (currentMonth === 0) {
    currentYear = currentYear + 1;
  }
  firstDay = (firstDay + 1) % 7;
  console.log(firstDay);
  monthAndYear.innerText = `${month[currentMonth]} ${currentYear}`;
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
});
// 달력의 전후버튼 추가
