export const formatDate = (date) => {
  const year = formatSingleDigit(date.getFullYear());
  const month = formatSingleDigit(date.getMonth() + 1);
  const dates = formatSingleDigit(date.getDate());
  const fullDate = `${year}-${month}-${dates}`;

  return {
    year,
    month,
    dates,
    fullDate,
  };
};

export const formatTime = (date) => {
  const hours = formatSingleDigit(date.getHours());
  const minutes = formatSingleDigit(date.getMinutes());
  const seconds = formatSingleDigit(date.getSeconds());
  const fullTime = `${hours}:${minutes}`;

  return {
    hours,
    minutes,
    seconds,
    fullTime,
  };
};

export const formatDay = (date) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()].toUpperCase();
};

export const formatSingleDigit = (number) => {
  return String(number).padStart(2, "0");
};
