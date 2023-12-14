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

const makeDay = () => {
  for (let i = 0; i < dayRow.length; i++) {
    dayRow[i].innerText = day[i];
  }
};
makeDay();
// 요일 라벨링 표기

const calendarDate = document.getElementById("calendar-date");
const dateContainer = calendarDate.children;
const td = document.querySelectorAll("td");
let firstDay = (8 - (currentDate % 7) + currentDay) % 7;

const makeDate = () => {
  // 31일 달력 생성
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

  // 30일 달력 생성
  if (
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

  // 2월 달력 생성
  if (currentMonth === 1) {
    for (let i = 1; i <= 29; i++) {
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
};
makeDate();
// 현재 월의 마지막 날까지 날짜 표기하기 (수정)

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

  if (
    currentMonth === 3 ||
    currentMonth === 5 ||
    currentMonth === 8 ||
    currentMonth === 10
  ) {
    if (firstDay === 0) {
      firstDay = 7;
      firstDay = firstDay - 2;
    } else {
      firstDay = Math.abs((firstDay + 5) % 7);
    }
  }

  if (
    currentMonth === 0 ||
    currentMonth === 2 ||
    currentMonth === 4 ||
    currentMonth === 6 ||
    currentMonth === 7 ||
    currentMonth === 9 ||
    currentMonth === 11
  ) {
    if (firstDay === 0) {
      firstDay = 7;
      firstDay = firstDay - 3;
    } else {
      firstDay = Math.abs((firstDay + 4) % 7);
    }
  }

  if (currentMonth === 1) {
    if (firstDay === 0) {
      firstDay = 7;
      firstDay = firstDay;
    } else {
      firstDay = Math.abs(firstDay % 7);
    }
  }
  monthAndYear.innerText = `${month[currentMonth]} ${currentYear}`;
  makeDate();
});
// 이전 버튼 기능

nextBtn.addEventListener("click", () => {
  init();
  currentMonth = (currentMonth + 1) % 12;
  if (currentMonth === 0) {
    currentYear = currentYear + 1;
  }
  monthAndYear.innerText = `${month[currentMonth]} ${currentYear}`;
  if (
    currentMonth === 0 ||
    currentMonth === 1 ||
    currentMonth === 3 ||
    currentMonth === 5 ||
    currentMonth === 7 ||
    currentMonth === 8 ||
    currentMonth === 10
  ) {
    firstDay = (firstDay + 3) % 7;
  }
  if (
    currentMonth === 4 ||
    currentMonth === 6 ||
    currentMonth === 9 ||
    currentMonth === 11
  ) {
    firstDay = (firstDay + 2) % 7;
  }
  if (currentMonth === 2) {
    firstDay = (firstDay + 1) % 7;
  }
  makeDate();
});
// 다음 버튼 기능
// 달력의 전후버튼 추가

const init = () => {
  for (let i = 1; i <= 31; i++) {
    switch (i % 7) {
      case 1:
        td[i - 1 + firstDay].innerText = "";
      case 2:
        td[i - 1 + firstDay].innerText = "";
      case 3:
        td[i - 1 + firstDay].innerText = "";
      case 4:
        td[i - 1 + firstDay].innerText = "";
      case 5:
        td[i - 1 + firstDay].innerText = "";
      case 6:
        td[i - 1 + firstDay].innerText = "";
      case 0:
        td[i - 1 + firstDay].innerText = "";
    }
  }
};
// 초기화 함수

const isToday = () => {
  if (monthAndYear.innerText === `${month[today.getMonth()]} ${currentYear}`) {
    for (let i of td) {
      if (i.innerText == currentDate) i.style.color = "red";
    }
  }
  console.log(`${month[currentMonth]} ${currentYear}`);
};
// 현재 날짜에 색상 입히기;
