alert(123);

document.addEventListener("DOMContentLoaded", () => {
  const element = document.querySelector(".install-code");
  const text = element.textContent;
  let index = 0;
  const TYPING_SPEED = 100;
  const BLINK_DURATION = 3000;

  function typeEffect() {
    if (index < text.length) {
      element.textContent = text.substring(0, index + 1);
      index++;
    } else {
      clearInterval(typingInterval);
      element.classList.add("blink");

      setTimeout(() => {
        element.classList.remove("blink");
        element.textContent = "";
        index = 0;

        typingInterval = setInterval(typeEffect, TYPING_SPEED);
      }, BLINK_DURATION);
    }
  }

  let typingInterval = setInterval(typeEffect, TYPING_SPEED);
});
