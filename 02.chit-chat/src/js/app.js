import { pushData, addChild } from "./firebase.js";

const userForm = document.querySelector(".user-form");
const userInput = userForm.querySelector(".user-input");
const errorMessage = document.querySelector(".error-message");
const loginWindow = document.querySelector(".login-window");
const logInButton = document.querySelector(".login-button");
const chatWindow = document.querySelector(".chat-window");
const chatSection = document.querySelector(".chat-section");
const sendForm = document.querySelector(".send-form");
const myChat = document.querySelector(".my-chat");
const MIN_USERNAME_LENGTH = 2;
const MAX_USERNAME_LENGTH = 20;

class ColorCode {
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  increaseBrightness() {
    const brightness = (this.r + this.g + this.b) / 3;
    const MIN_OF_BRIGHTNESS = 180;

    if (brightness < MIN_OF_BRIGHTNESS) {
      const moreBrightness = Math.ceil((MIN_OF_BRIGHTNESS - brightness) / 3);
      this.r += moreBrightness;
      this.g += moreBrightness;
      this.b += moreBrightness;
    }

    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  }
}

const generateRGBCode = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const color = new ColorCode(r, g, b);

  return color.increaseBrightness();
};

const validateUserName = (str) => {
  if (str.length === 0) return true;

  if (MIN_USERNAME_LENGTH <= str.length && str.length < MAX_USERNAME_LENGTH) {
    const specialCharacters = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";

    for (const ch of str) {
      if (specialCharacters.includes(ch)) return false;
    }

    return true;
  }

  return false;
};

const toggleErrorMessage = (e) => {
  const target = e.target;

  if (!validateUserName(target)) {
    logInButton.removeAttribute("disabled");
    errorMessage.style.display = validateUserName(target.value)
      ? "none"
      : "block";
  }

  if (MAX_USERNAME_LENGTH <= target.value.length) {
    target.value = target.value.slice(0, 19);
    errorMessage.style.display = "block";
    logInButton.setAttribute("disabled", "");
  }
};

const submitUserInfo = (e) => {
  e.preventDefault();
  let userName = e.target.firstElementChild.value;

  if (validateUserName(userName)) {
    setUserInfo(userName);
    loginWindow.style.visibility = "hidden";
    loginWindow.style.height = "0";
    chatWindow.style.visibility = "visible";
    userName = "";
    myChat.focus();
  }
};

const createChatData = function () {
  const myChatData = {};

  return {
    setData: function (key, value) {
      myChatData[key] = value;
    },

    getData: function () {
      return myChatData;
    },
  };
};

const chatData = createChatData();

const setUserInfo = (userName) => {
  chatData.setData("username", userName);
  chatData.setData("colorCode", generateRGBCode());
};

const sendMyMessage = (e) => {
  e.preventDefault();
  const message = e.target.firstElementChild;

  if (message.value !== "") {
    chatData.setData("text", message.value);
    chatData.setData("createdAt", generateDate());
    manageChat(chatData.getData());
  }

  pushData(chatData);

  message.value = "";
};

const manageChat = (chatInfo, others) => {
  const newChat = document.createElement("div");
  const userSection = document.createElement("div");
  const user = document.createElement("div");
  const createdAt = document.createElement("div");
  const messageSection = document.createElement("div");
  const messageContent = document.createElement("div");
  const deleteButton = document.createElement("button");
  const checkSpan = document.createElement("span");
  let isDeleteButtonThere = false;

  chatSection.append(newChat);
  newChat.append(userSection, messageSection);
  userSection.append(user, createdAt);
  messageSection.append(messageContent);

  const toggleDeleteButton = (e) => {
    if (!isDeleteButtonThere) {
      messageSection.append(checkSpan);
      messageSection.append(deleteButton);
      deleteButton.textContent = "삭제";
      checkSpan.textContent = "v";
      deleteButton.classList.add("delete-button");
      checkSpan.classList.add("check-span");
      deleteButton.addEventListener("click", removeMessage);
      isDeleteButtonThere = true;
    } else {
      const deleteBtn = e.target.nextSibling;
      const checkMark = deleteBtn.nextSibling;
      deleteBtn.remove();
      checkMark.remove();
      isDeleteButtonThere = false;
    }
  };

  user.textContent = chatInfo["username"];
  messageContent.textContent = chatInfo["text"];
  createdAt.textContent = chatInfo["createdAt"];
  messageContent.style.color = chatInfo["colorCode"];

  messageContent.addEventListener("click", toggleDeleteButton);

  if (others) {
    newChat.style.marginLeft = "5px";
    newChat.classList.add("new-chat");
    userSection.classList.add("user-section");
    user.classList.add("other-user");
    createdAt.classList.add("created-at");
    messageSection.classList.add("message-section");
    messageContent.classList.add("message-content", "other-message-content");
  } else {
    newChat.style.marginRight = "5px";
    newChat.classList.add("new-chat", "right-move");
    userSection.classList.add("user-section", "reverse");
    user.classList.add("user", "right-move");
    createdAt.classList.add("my-created-at");
    messageSection.classList.add("message-section", "reverse");
    messageContent.classList.add("message-content");
  }

  chatSection.scrollTop = chatSection.scrollHeight;
  chatWindow.addEventListener("scroll", controlScroll);
};

const removeMessage = (e) => {
  const selectedMessage = e.target.parentElement.parentElement;
  selectedMessage.remove();
};

const controlScroll = () => {
  chatSection.scroll({ top: chatSection.scrollHeight, behavior: smooth });
};

const generateDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const date = now.getDate().toString().padStart(2, "0");
  const beforenoon = now.getHours() < 12 ? "오전" : "오후";
  const hour = now.getHours() % 12 || 12;
  const minute = now.getMinutes().toString().padStart(2, "0");
  const writtenDate = `${year}-${month}-${date} ${beforenoon} ${hour}:${minute}`;

  return writtenDate;
};

addChild(chatData, manageChat);

userInput.addEventListener("input", toggleErrorMessage);
userForm.addEventListener("submit", submitUserInfo);
sendForm.addEventListener("submit", sendMyMessage);
