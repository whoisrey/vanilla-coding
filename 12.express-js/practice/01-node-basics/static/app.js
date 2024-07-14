const title = document.querySelector("h1");
let count = 1;

title.textContent = "Hello, World.. " + count;

setInterval(() => {
  count++;
  title.textContent = "Hello, World.. " + count;
}, 500);
