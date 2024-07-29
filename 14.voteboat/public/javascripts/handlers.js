import {
  validateSignupForm,
  validateLoginForm,
  validateEntryLists,
} from "./validators.js";

const signupForm = document.querySelector(".signup-form");
const loginForm = document.querySelector(".login-form");

const optionLabel = document.querySelector(".option-label");

const createButton = document.querySelector(".create-button");
const listButton = document.querySelector(".list-button");
const entryButton = document.querySelector(".entry-button");
const backButton = document.querySelector(".back-button");
const homeButton = document.querySelector(".home-button");

const submitSignupUser = (event) => {
  if (!validateSignupForm(signupForm)) {
    event.preventDefault();
  }
};

const submitLoginUser = (event) => {
  if (!validateLoginForm(loginForm)) {
    event.preventDefault();
  }
};

const createOption = () => {
  const createdInput = document.createElement("input");

  optionLabel.append(createdInput);
  createdInput.classList.add("new-option");
  createdInput.id = "option";
  createdInput.name = "options";
};

const createLists = (event) => {
  if (!validateEntryLists()) {
    event.preventDefault();
  }
};

const goBack = () => {
  window.history.back();
};

const goHome = () => {
  window.location.href = "/";
};

if (signupForm) {
  signupForm.addEventListener("submit", submitSignupUser);
}

if (loginForm) {
  loginForm.addEventListener("submit", submitLoginUser);
}

if (createButton) {
  createButton.addEventListener("click", createOption);
}

if (entryButton) {
  entryButton.addEventListener("click", createLists);
}

if (listButton) {
  listButton.addEventListener("click", (event) => {
    event.preventDefault();
    goHome();
  });
}

if (backButton) {
  backButton.addEventListener("click", goBack);
}

if (homeButton) {
  homeButton.addEventListener("click", goHome);
}
