function insertionSort(array) {
  for (let i = 1; i < array.length; i++) {
    const currentElement = array[i];
    let previousIndex = i - 1;

    while (previousIndex >= 0 && array[previousIndex] > currentElement) {
      array[previousIndex + 1] = array[previousIndex];
      previousIndex--;
    }

    array[previousIndex + 1] = currentElement;
  }

  return array;
}
