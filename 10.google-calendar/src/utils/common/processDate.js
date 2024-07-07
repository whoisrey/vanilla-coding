import { changeDate } from "../slices/calendarSlice";

export function formatDate(date, index = 0) {
  const createdDate = new Date(date);
  const formattedDate = new Date(
    createdDate.setDate(createdDate.getDate() + index)
  );

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Nov",
    "Dec",
  ];

  const monthForData =
    formattedDate.getMonth() + 1 < 10
      ? "0" + (formattedDate.getMonth() + 1)
      : formattedDate.getMonth();

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const newYear = formattedDate.getFullYear();
  const newMonth = months[formattedDate.getMonth()];
  const newDate =
    formattedDate.getDate() < 10
      ? "0" + formattedDate.getDate()
      : formattedDate.getDate();
  const newDay = days[formattedDate.getDay()];
  const newHour = formattedDate.getHours();
  const newDayOrder = formattedDate.getDay();
  const newData = `${newYear}-${monthForData}-${newDate}`;

  return {
    formattedDate,
    newMonth,
    newDate,
    newDay,
    newHour,
    newDayOrder,
    newData,
  };
}

export function getStartOfWeek(date) {
  const formattedDate = formatDate(date).formattedDate;
  const dateInterval =
    formatDate(formattedDate).newDate - formatDate(formattedDate).newDayOrder;

  return new Date(formattedDate.setDate(dateInterval));
}

export function updateNow(dispatch) {
  const today = Date.now();

  dispatch(changeDate(today));
}

export function updatePrevDate(dispatch, currentDate) {
  const formattedDate = formatDate(currentDate);
  formattedDate.formattedDate.setDate(
    formattedDate.formattedDate.getDate() - 1
  );

  const yesterday = formattedDate.formattedDate.toISOString();

  dispatch(changeDate(yesterday));
}

export function updateNextDate(dispatch, currentDate) {
  const formattedDate = formatDate(currentDate);
  formattedDate.formattedDate.setDate(
    formattedDate.formattedDate.getDate() + 1
  );

  const tomorrow = formattedDate.formattedDate.toISOString();

  dispatch(changeDate(tomorrow));
}

export function updatePrevWeek(dispatch, currentDate) {
  const formattedDate = formatDate(currentDate);
  formattedDate.formattedDate.setDate(
    formattedDate.formattedDate.getDate() - 7
  );

  const prevWeek = formattedDate.formattedDate.toISOString();

  dispatch(changeDate(prevWeek));
}

export function updateNextWeek(dispatch, currentDate) {
  const formattedDate = formatDate(currentDate);
  formattedDate.formattedDate.setDate(
    formattedDate.formattedDate.getDate() + 7
  );

  const nextWeek = formattedDate.formattedDate.toISOString();

  dispatch(changeDate(nextWeek));
}
