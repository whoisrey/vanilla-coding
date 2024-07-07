const hour = document.querySelector(".hour");
const minute = document.querySelector(".min");
const second = document.querySelector(".sec");

const clock = () => {
  const now = new Date();

  hour.innerText = now.getHours();
  minute.innerText = now.getMinutes();
  second.innerText = now.getSeconds();
};

setInterval(clock, 1000);
