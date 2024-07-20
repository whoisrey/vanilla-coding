document.addEventListener("DOMContentLoaded", () => {
  const homeButtons = document.querySelectorAll(".home-button");
  const homeImage = document.querySelector(".home-image");
  const backButton = document.querySelector(".back-button");
  const closeButton = document.querySelector(".close-button");
  const modalContainer = document.querySelector(".modal-container");

  const loginForm = document.querySelector(".login-form");
  const loginUsernameLabel = document.querySelector(".login-username-label");
  const loginPasswordLabel = document.querySelector(".login-password-label");
  const usernameEmpty = document.querySelector(".username-empty");
  const passwordEmpty = document.querySelector(".password-empty");

  const closeModal = () => {
    modalContainer.style.display = "none";
  };

  const goBack = () => {
    window.history.back();
  };

  const goToHome = () => {
    window.location.href = "/";
  };

  const validateForm = (event) => {
    const [{ value: usernameValue }, { value: passwordValue }] = event.target;

    if (!usernameValue) {
      loginUsernameLabel.classList.add("empty");
      usernameEmpty.style.display = "block";
      event.preventDefault();
    }
    if (!passwordValue) {
      loginPasswordLabel.classList.add("empty");
      passwordEmpty.style.display = "block";
      event.preventDefault();
    }
  };

  const removeClassName = (event) => {
    const targetLabel = event.target.parentNode;
    const targetText = event.target.parentNode.nextSibling.nextSibling;

    targetLabel.classList.remove("empty");
    targetText.style.display = "none";
  };

  if (closeButton) {
    closeButton.addEventListener("click", closeModal);
  }

  if (backButton) {
    backButton.addEventListener("click", goBack);
  }

  if (homeImage) {
    homeImage.addEventListener("click", goToHome);
  }

  homeButtons.forEach((button) => {
    button.addEventListener("click", goToHome);
  });

  if (loginForm) {
    loginForm.addEventListener("submit", validateForm);
    loginForm.addEventListener("keydown", removeClassName);
  }
});
