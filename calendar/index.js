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
const currentMonth = month[today.getMonth()];
const currentDay = day[today.getDay()];
const currentDate = today.getDate();

const dayAndDate = document.querySelector(".day-date");
const clickedDay = document.getElementById("day");
const clickedDate = document.getElementById("date");
const monthAndYear = document.getElementById("month-year");

clickedDay.innerText = `${currentDay}`;
clickedDate.innerText = `${currentDate}`;
monthAndYear.innerText = `${currentMonth} ${currentYear}`;
// 현재 요일, 날짜, 월, 연도 표기

const calendarDay = document.getElementById("calendar-day");
const dayContainer = calendarDay.children;
const dayRow = dayContainer[0].children;

for (let i = 0; i < dayRow.length; i++) {
  dayRow[i].innerText = day[i];
}
// 요일 라벨링 표기
