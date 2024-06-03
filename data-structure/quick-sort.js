// function quickSort(array, left = 0, right = array.length - 1) {
//   if (left >= right) {
//     return;
//   }
//   const mid = Math.floor((left + right) / 2);
//   const pivot = array[mid];
//   const partition = divide(array, left, right, pivot);
//   quickSort(array, left, partition - 1);
//   quickSort(array, partition, right);

//   function divide(array, left, right, pivot) {
//     console.log(
//       `array: ${array}, left: ${array[left]}, pivot: ${pivot}, right: ${array[right]}`
//     );
//     while (left <= right) {
//       while (array[left] < pivot) {
//         left++;
//       }
//       while (array[right] > pivot) {
//         right--;
//       }
//       if (left <= right) {
//         let swap = array[left];
//         array[left] = array[right];
//         array[right] = swap;
//         left++;
//         right--;
//       }
//     }
//     return left;
//   }
//   return array;
// }

function executePartition(array, start, end) {
  const pivotValue = array[start];
  let leftPointer = start + 1;
  let rightPointer = end;

  while (leftPointer <= rightPointer) {
    while (leftPointer < array.length && array[leftPointer] < pivotValue) {
      leftPointer++;
    }
    while (array[rightPointer] > pivotValue) {
      rightPointer--;
    }

    if (leftPointer < rightPointer) {
      [array[leftPointer], array[rightPointer]] = [
        array[rightPointer],
        array[leftPointer],
      ];
    }
  }

  [array[rightPointer], array[start]] = [array[start], array[rightPointer]];

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
