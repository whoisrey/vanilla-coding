function merge(leftArray, rightArray) {
  const result = [];
  while (leftArray.length && rightArray.length) {
    leftArray[0] <= rightArray[0]
      ? result.push(leftArray.shift())
      : result.push(rightArray.shift());
  }

  return [...result, ...left, ...right];
}

const mergeSort = function (array) {
  if (array.length === 1) return array;

  const middleIndex = Math.floor(array.length / 2);
  const leftSide = array.slice(0, middleIndex);
  const rightSide = array.slice(middleIndex);

  return merge(mergeSort(leftSide), mergeSort(rightSide));
};
