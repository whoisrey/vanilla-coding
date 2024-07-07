import "../styles/reset.css";
import "../styles/style.css";
import {
  MIN_RANGE_NUMBER,
  MIN_INPUT_NUMBER,
  MAX_RANGE_NUMBER,
  MAX_INPUTS_NUMBER,
  AVAILABLE_SORTING_ALGORITHMS,
} from "./constants";
import createLinkedList from "./linkedList";

const formContainer = document.querySelector(".form-container");
const userInput = document.querySelector("#userInput");
const errorMessage = document.querySelector(".error-message");
const sortingArea = document.querySelector(".sorting-area");
const sortingButton = document.querySelector(".sorting-button");
const inputValueStorage = [];
const linkedList = createLinkedList();

function validateUserInput(event) {
  const userInputValue = event.target.value.trim();

  if (userInputValue === "") {
    clearErrorMessage();
    return;
  }

  if (isNaN(userInputValue)) {
    showErrorMessage("Please enter only integers.");
  } else {
    clearErrorMessage();
  }
}

const selectBox = document.querySelector(".select-box");

function createSelectOptionTag(sortingAlgorithms, selectBox) {
  Object.keys(sortingAlgorithms).forEach((type) => {
    const optionTag = document.createElement("option");

    optionTag.setAttribute("value", type);
    optionTag.innerText = type;

    selectBox.append(optionTag);
  });
}

createSelectOptionTag(AVAILABLE_SORTING_ALGORITHMS, selectBox);

function showErrorMessage(message) {
  errorMessage.innerText = message;
}

function clearErrorMessage() {
  errorMessage.innerText = "";
}

function processUserInput(event) {
  event.preventDefault();

  const inputField = event.target.querySelector("#userInput");
  const inputValue = Number(inputField.value.trim());

  if (inputField.value.trim() === "") {
    showErrorMessage("Input cannot be empty.");
    return;
  }

  if (isNaN(inputValue) || !Number.isInteger(inputValue)) {
    showErrorMessage("Please enter only integers.");
    return;
  }

  if (checkForDuplicateValue(inputValue)) {
    showErrorMessage("Duplicate values are not allowed.");
    return;
  }

  if (inputValueStorage.length >= MAX_INPUTS_NUMBER) {
    showErrorMessage("Please enter 10 or less inputs.");
    return;
  }

  if (inputValue > MAX_RANGE_NUMBER || inputValue < MIN_RANGE_NUMBER) {
    showErrorMessage("The range of input is 1 between 20");
    return;
  }

  clearErrorMessage();
  renderBar(inputValue);
  inputValueStorage.push(inputValue);

  inputField.value = "";
}

function checkForDuplicateValue(value) {
  return inputValueStorage.includes(value);
}

function handleSortButtonClick() {
  if (inputValueStorage.length < MIN_INPUT_NUMBER) {
    showErrorMessage("Please enter at least 5 inputs.");
  } else {
    const bars = document.querySelectorAll(".bar");
    const selectBox = document.querySelector(".select-box");

    clearErrorMessage();
    bars.forEach((v, i) => (v.style.order = i));
    switch (selectBox.value) {
      case "BUBBLE":
        bubbleSort(inputValueStorage);
        processVisualization(linkedList);
        break;
      case "INSERTION":
        insertionSort(inputValueStorage);
        processVisualizationByInsertion(linkedList);
        break;
      case "QUICK":
        quickSort(inputValueStorage);
        processVisualization(linkedList);
        break;
      default:
        throw new Error("Working...");
    }

    sortingButton.setAttribute("disabled", true);
    userInput.setAttribute("disabled", true);
  }
}

function renderBar(value) {
  const bar = document.createElement("div");
  const barValue = document.createElement("p");

  sortingArea.append(bar);
  bar.classList.add("bar");
  bar.style.height = `${value}rem`;
  bar.append(barValue);

  barValue.innerText = `${value}`;
  barValue.style.fontSize = "1.25rem";
}

function captureNode(node) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(node);
    }, 1000);
  });
}

function getTargetIndex(nodeList, target) {
  return [...nodeList].findIndex((element) => {
    return parseInt(element.innerText) === target;
  });
}

function applyDisableEffect(nodeList, nodeValue) {
  const disabledBars = [...nodeList].filter((v) => {
    return v.style.order < nodeValue.start || nodeValue.end < v.style.order;
  });

  nodeList.forEach((element) => {
    const hasDisabledBar = disabledBars.some((bar) => {
      return bar.style.order === element.style.order;
    });

    element.classList.remove("disabled");

    if (hasDisabledBar) {
      element.classList.add("disabled");
    }
  });
}

function swapBar(swapInfo) {
  const { nodeValue, rightBar, leftBar, tempOrder, pivotBar } = swapInfo;

  if (nodeValue.swapRightWithLeft) {
    rightBar.style.order = leftBar.style.order;
    leftBar.style.order = tempOrder;
  } else if (nodeValue.swapRightWithPivot) {
    rightBar.style.order = pivotBar.style.order;
    pivotBar.style.order = tempOrder;
  }
}

function updateVisualization(nodeValue) {
  const bars = document.querySelectorAll(".bar");

  const leftIndex = getTargetIndex(bars, nodeValue.left);
  const rightIndex = getTargetIndex(bars, nodeValue.right);
  const pivotIndex = getTargetIndex(bars, nodeValue.pivot);

  const leftBar = bars[leftIndex];
  const rightBar = bars[rightIndex];
  const pivotBar = bars[pivotIndex];
  const tempOrder = rightBar.style.order;

  swapBar({ nodeValue, rightBar, leftBar, tempOrder, pivotBar });
  toggleEffect(pivotBar, "pivot");
  toggleEffect(leftBar, "left");
  toggleEffect(rightBar, "right");
  applyDisableEffect(bars, nodeValue);
}

function toggleEffect(element, className) {
  const bars = document.querySelectorAll(".bar");

  bars.forEach((bar) => {
    bar.classList.remove(className);
  });

  if (element) {
    element.classList.add(className);
  }
}

async function processVisualization(linkedList) {
  const bars = document.querySelectorAll(".bar");
  const AUDIO_COMPLETE = new Audio("../assets/pokemon.mp4");
  let currentNode = linkedList.head;

  while (currentNode) {
    const capturedNode = await captureNode(currentNode);

    updateVisualization(capturedNode.value);

    currentNode = currentNode.next;

    if (!currentNode) {
      bars.forEach((bar) => {
        bar.classList.add("twinkle");
        bar.classList.remove("pivot", "disabled", "left", "right");
        AUDIO_COMPLETE.play();
      });

      setTimeout(() => {
        resetSortingArea(bars);
      }, 4300);
    }
  }
}

function swapBarInsertion(swapInfo) {
  const { rightBar, leftNextBar, tempOrder } = swapInfo;

  rightBar.style.order = leftNextBar.style.order;
  leftNextBar.style.order = tempOrder;
}

function updateVisualizationByInsertion(nodeValue) {
  const bars = document.querySelectorAll(".bar");

  const leftIndex = getTargetIndex(bars, nodeValue.previous);
  const leftNextIndex = getTargetIndex(bars, nodeValue.previousNext);
  const rightIndex = getTargetIndex(bars, nodeValue.current);

  const leftBar = bars[leftIndex];
  const leftNextBar = bars[leftNextIndex];
  const rightBar = bars[rightIndex];
  const tempOrder = rightBar.style.order;

  if (nodeValue.isSwap) {
    swapBarInsertion({ rightBar, leftNextBar, tempOrder });
  }

  toggleEffect(leftBar, "left");
  toggleEffect(rightBar, "right");
}

async function processVisualizationByInsertion(linkedList) {
  const bars = document.querySelectorAll(".bar");
  const AUDIO_COMPLETE = new Audio("../assets/pokemon.mp4");
  let currentNode = linkedList.head;

  while (currentNode) {
    const capturedNode = await captureNode(currentNode);

    updateVisualizationByInsertion(capturedNode.value);

    currentNode = currentNode.next;

    if (!currentNode) {
      bars.forEach((bar) => {
        bar.classList.add("twinkle");
        bar.classList.remove("disabled", "left", "right");
        AUDIO_COMPLETE.play();
      });

      setTimeout(() => {
        resetSortingArea(bars);
      }, 4300);
    }
  }
}

function resetSortingArea(nodeList) {
  sortingButton.removeAttribute("disabled");
  userInput.removeAttribute("disabled");
  inputValueStorage.length = 0;
  nodeList.forEach((node) => node.remove());
  linkedList.reset();
}

function handleSnapshot(node) {
  const snapshot = linkedList.createNode(node);
  linkedList.addToTail(snapshot);
}

function executePartition(array, start, end) {
  const pivotValue = array[start];
  let leftPointer = start + 1;
  let rightPointer = end;

  handleSnapshot({
    pivot: pivotValue,
    start: start,
    end: end,
    left: array[leftPointer],
    right: array[rightPointer],
  });

  while (leftPointer <= rightPointer) {
    while (leftPointer < array.length && array[leftPointer] < pivotValue) {
      leftPointer++;

      handleSnapshot({
        pivot: pivotValue,
        start: start,
        end: end,
        left: array[leftPointer],
        right: array[rightPointer],
      });
    }
    while (array[rightPointer] > pivotValue) {
      rightPointer--;

      handleSnapshot({
        pivot: pivotValue,
        start: start,
        end: end,
        left: array[leftPointer],
        right: array[rightPointer],
      });
    }

    if (leftPointer < rightPointer) {
      [array[leftPointer], array[rightPointer]] = [
        array[rightPointer],
        array[leftPointer],
      ];

      handleSnapshot({
        pivot: pivotValue,
        start: start,
        end: end,
        left: array[leftPointer],
        right: array[rightPointer],
        swapRightWithLeft: true,
      });
    }
  }

  [array[rightPointer], array[start]] = [array[start], array[rightPointer]];

  handleSnapshot({
    pivot: pivotValue,
    start: start,
    end: end,
    left: array[rightPointer],
    right: array[start],
    swapRightWithLeft: false,
    swapRightWithPivot: true,
  });

  return rightPointer;
}

function quickSort(array, start = 0, end = array.length - 1) {
  if (start < end) {
    const pivotIndex = executePartition(array, start, end);

    quickSort(array, start, pivotIndex - 1);
    quickSort(array, pivotIndex + 1, end);
  }

  return array;
}

function bubbleSort(array) {
  const length = array.length;
  let isSwapped = true;

  while (isSwapped) {
    isSwapped = false;

    for (let i = 0; i < length - 1; i++) {
      handleSnapshot({
        start: 0,
        end: length - 1,
        left: array[i],
        right: array[i + 1],
      });
      if (array[i] > array[i + 1]) {
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        isSwapped = true;

        handleSnapshot({
          start: 0,
          end: length - 1,
          left: array[i],
          right: array[i + 1],
          swapRightWithLeft: true,
        });
      }
    }
  }

  return array;
}

function insertionSort(array) {
  for (let i = 1; i < array.length; i++) {
    const currentElement = array[i];
    let previousIndex = i - 1;

    handleSnapshot({
      current: currentElement,
      previous: array[previousIndex],
      previousNext: array[previousIndex + 1],
    });

    while (previousIndex >= 0 && array[previousIndex] > currentElement) {
      array[previousIndex + 1] = array[previousIndex];

      previousIndex--;

      handleSnapshot({
        current: currentElement,
        previous: array[previousIndex],
        previousNext: array[previousIndex + 1],
      });

      handleSnapshot({
        current: currentElement,
        previous: array[previousIndex],
        previousNext: array[previousIndex + 1],
        isSwap: true,
      });
    }

    array[previousIndex + 1] = currentElement;
  }

  return array;
}

userInput.addEventListener("input", validateUserInput);
formContainer.addEventListener("submit", processUserInput);
sortingButton.addEventListener("click", handleSortButtonClick);
