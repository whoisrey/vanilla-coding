const signupEmail = document.querySelector(".signup-email");
const signupPassword = document.querySelector(".signup-password");
const signupPasswordCheck = document.querySelector(".password-check");

const signupEmailError = document.querySelector(".signup-email-error");
const signupPasswordError = document.querySelector(".signup-password-error");
const signupPasswordCheckError = document.querySelector(
  ".password-check-error"
);

const loginEmail = document.querySelector(".login-email");
const loginPassword = document.querySelector(".login-password");

const loginEmailError = document.querySelector(".login-email-error");
const loginPasswordError = document.querySelector(".login-password-error");

const newTitle = document.querySelector(".new-title");
const expiredDate = document.querySelector(".expired-date");
const date = new Date(
  new Date().getTime() - new Date().getTimezoneOffset() * 60000
)
  .toISOString()
  .slice(0, -5);

const titleError = document.querySelector(".title-error");
const optionError = document.querySelector(".option-error");
const expiredDateError = document.querySelector(".expired-date-error");

const validateText = (input, errorText) => {
  if (input.value.trim() === "") {
    errorText.style.display = "block";
    input.style.border = "1px solid red";

    return false;
  } else {
    errorText.style.display = "none";
    input.style.border = "none";
    input.style.borderBottom = "1px solid #9165BC";

    return true;
  }
};

const checkPasswords = () => {
  if (signupPassword.value !== signupPasswordCheck.value) {
    signupPasswordCheckError.style.display = "block";
    signupPasswordCheck.style.border = "1px solid red";

    return false;
  } else {
    signupPasswordCheckError.style.display = "none";
    signupPasswordCheck.style.border = "none";
    signupPasswordCheck.style.borderBottom = "1px solid #9165BC";

    return true;
  }
};

const validateDate = () => {
  if (expiredDate.value.trim() === "") {
    expiredDateError.style.display = "block";
    expiredDate.style.border = "1px solid red";

    return false;
  } else {
    if (expiredDate.value < date) {
      expiredDateError.style.display = "block";
      expiredDate.style.border = "1px solid red";

      return false;
    } else {
      expiredDateError.style.display = "none";
      expiredDate.style.border = "none";
      expiredDate.style.borderBottom = "1px solid #9165BC";

      return true;
    }
  }
};

export const validateSignupForm = () => {
  let isValid = true;

  if (!validateText(signupEmail, signupEmailError)) isValid = false;
  if (!validateText(signupPassword, signupPasswordError)) isValid = false;
  if (!checkPasswords()) isValid = false;

  return isValid;
};

export const validateLoginForm = () => {
  let isValid = true;

  if (!validateText(loginEmail, loginEmailError)) isValid = false;
  if (!validateText(loginPassword, loginPasswordError)) isValid = false;

  return isValid;
};

export const validateEntryLists = () => {
  let isValid = true;

  if (!validateText(newTitle, titleError)) isValid = false;

  const allOptions = document.querySelectorAll(".new-option");
  let isOptionValid = true;

  allOptions.forEach((option) => {
    if (!validateText(option, optionError)) {
      isOptionValid = false;
    }
  });

  if (!isOptionValid) isValid = false;
  if (!validateDate()) isValid = false;

  return isValid;
};
