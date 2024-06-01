function bubbleSort(array) {
  const length = array.length;
  let isSwapped = true;

  while (isSwapped) {
    isSwapped = false;

    for (let i = 0; i < length - 1; i++) {
      if (array[i] > array[i + 1]) {
        [array[i], array[i + 1]] = [array[i + 1], array[i]];
        isSwapped = true;
      }
    }
  }

  return array;
}
