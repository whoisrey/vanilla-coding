import { counter } from "./counter";

const button = document.getElementById("blue");

button.addEventListener("click", () => {
  console.log("Counter total: ", counter.increment());
});
