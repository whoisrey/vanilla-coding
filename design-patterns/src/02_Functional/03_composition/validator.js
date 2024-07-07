function isLongEnough(userInput, min = 0, max = 100000) {
  return userInput.length >= min && userInput.length < max;
}

function hasCharacter(input, chars) {
  const userInput = [...input];

  return userInput.some((char) => chars.includes(char));
}

function hasUpperCase(input) {
  const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  return hasCharacter(input, upperChars);
}

function hasLowerCase(input) {
  const lowerChars = "abcdefghijklmnopqrstuvwxyz";

  return hasCharacter(input, lowerChars);
}

function hasDigit(input) {
  const digits = "0123456789";

  return hasCharacter(input, digits);
}

function hasSpecialChar(input) {
  const specialChars = "!@#$%^&*()_+-=[]{};:'\"\\|,.<>/?";

  return hasCharacter(input, specialChars);
}

function isValidCharacters(input) {
  const validCharacters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-";
  const userInput = [...input];

  return userInput.every((char) => validCharacters.includes(char));
}

function isValidDash(userInput) {
  const firstChar = userInput[0];
  const lastChar = userInput[userInput.length - 1];

  return (
    firstChar !== "_" &&
    firstChar !== "-" &&
    lastChar !== "_" &&
    lastChar !== "-"
  );
}

function compose(...funcs) {
  return function (...args) {
    return function (input) {
      for (const func of funcs) {
        if (!func(input, ...args)) {
          return false;
        }
      }
      return true;
    };
  };
}

function validatePassword(...args) {
  const passwordFuncs = [
    isLongEnough,
    hasUpperCase,
    hasLowerCase,
    hasDigit,
    hasSpecialChar,
  ];

  return compose(...passwordFuncs)(...args);
}

function validateUsername(...args) {
  const usernameFuncs = [isLongEnough, isValidCharacters, isValidDash];

  return compose(...usernameFuncs)(...args);
}

const validateVacoUsername = validateUsername(3, 16);
const validateVacoPassword = validatePassword(8);

const vacoUsername = "withVaco";
const vacoPassword = "Vaco_zzang123";

validateVacoUsername(vacoUsername);
validateVacoPassword(vacoPassword);

const wrongUsername = 1234;
const wrongPassword = "Vaco123";

validateVacoUsername(wrongUsername);
validateVacoPassword(wrongPassword);
