// // 1. 삭제 버튼
// // 2. 새로고침 저장
// // 로컬 스토리지 저장
// // 3. 삭제 버튼 -> 저장된 데이터 업데이트

// const form = document.querySelector("form");
// const input = document.querySelector("input");
// const listContainer = document.querySelector("ul");

// // 아이템들을 저장할 배열
// let todos = [];

// // 로컬스토리지에 저장하는 함수
// const saveItems = (todo) => {
//   localStorage.setItem("todos", JSON.stringify(todos));
// };

// const delItem = (e) => {
//   const target = e.target.parentElement;
//   todos = todos.filter((todo) => todo.id !== parseInt(target.id));
//   saveItems();
//   target.remove();
// };

// const addItem = (todo) => {
//   if (todo.text !== "") {
//     const list = document.createElement("li");
//     const button = document.createElement("button");
//     const span = document.createElement("span");

//     span.innerText = todo.text;
//     button.style.float = "right";
//     button.innerText = "Del";
//     button.addEventListener("click", delItem);

//     list.appendChild(span);
//     list.appendChild(button);
//     listContainer.appendChild(list);
//     list.id = todo.id;
//   }
// };

// const handler = (e) => {
//   e.preventDefault();

//   const todo = {
//     id: Date.now(),
//     text: input.value,
//   };

//   todos.push(todo);
//   addItem(todo);
//   saveItems();
//   input.value = "";
// };

// // 새로고침했을 때
// const init = () => {
//   const userTodos = JSON.parse(localStorage.getItem("todos"));

//   if (userTodos) {
//     userTodos.forEach((todo) => {
//       addItem(todo);
//       todos = userTodos;
//     });
//   }
// };

// init();
// form.addEventListener("submit", handler);

// // 로컬스토리지에 저장
// // localStorage.setItem("hello", "df");
// // 로컬스토리지에 저장되어 있는 값을 빼오기
// // localStorage.getItem("hello");

// --------------------------------------------------------------------------------------------
// const form = document.querySelector("form");
// const input = document.querySelector("input");
// const ul = document.querySelector("ul");

// let todos = [];

// function save() {
//   localStorage.setItem("todos", JSON.stringify(todos));
// }

// function delItem(event) {
//   const target = event.target.parentElement;

//   todos = todos.filter((todo) => todo.id !== parseInt(target.id));
//   save();
//   target.remove();
// }

// function addItem(todo) {
//   if (todo.text !== "") {
//     const li = document.createElement("li");
//     const button = document.createElement("button");
//     const span = document.createElement("span");

//     button.innerText = "삭제";
//     button.addEventListener("click", delItem);
//     span.innerText = todo.text;

//     li.appendChild(span);
//     li.appendChild(button);
//     ul.appendChild(li);
//     li.id = todo.id;
//   }
// }

// function handler(event) {
//   event.preventDefault();

//   const todo = {
//     id: Date.now(),
//     text: input.value,
//   };

//   if (todo.text !== "") {
//     todos.push(todo);
//     addItem(todo);
//     save();
//   }
//   input.value = "";
// }

// function init() {
//   const userTodos = JSON.parse(localStorage.getItem("todos"));

//   if (userTodos) {
//     userTodos.forEach((todo) => addItem(todo));
//     todos = userTodos;
//   }
// }

// init();
// form.addEventListener("submit", handler);

// --------------------------------------------------------------------------------------------

const form = document.querySelector("form");
const input = document.querySelector("input");
const button = document.querySelector("button");

const listContainer = document.querySelector("ul");

let todos = [];

const saveItem = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const delItem = (e) => {
  const target = e.target.parentElement;

  todos = todos.filter((todo) => todo.id !== parseInt(target.id));
  saveItem();
  target.remove();
};

const addItem = (todo) => {
  if (todo.text !== "") {
    const list = document.createElement("li");
    const delBtn = document.createElement("button");

    listContainer.append(list);
    list.innerText = todo.text;
    list.append(delBtn);
    delBtn.style.float = "right";
    delBtn.innerText = "Del";
    delBtn.addEventListener("click", delItem);
    list.id = todo.id;
  }
};

const handler = (e) => {
  e.preventDefault();
  const todo = {
    id: Date.now(),
    text: input.value,
  };

  if (todo.text !== "") {
    todos.push(todo);
    addItem(todo);
    saveItem();
  }
  input.value = "";
};

const init = () => {
  const userTodos = JSON.parse(localStorage.getItem("todos"));

  if (userTodos) {
    userTodos.forEach((todo) => addItem(todo));
    todos = userTodos;
  }
};

init();
form.addEventListener("submit", handler);
