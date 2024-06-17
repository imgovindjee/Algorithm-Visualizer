import swap from './Swap'
import { arrayAreEqual } from './CheckSorting';


const partition = (cpy_array, low, high, animations) => {
    // let pivotIdx = Math.floor(Math.random() * (high - low + 1) + low);
    let pivotIdx = high;

    animations.push(["comparision1", pivotIdx, high]);
    animations.push(["swap", pivotIdx, cpy_array[high]]);
    animations.push(["swap", high, cpy_array[pivotIdx]]);
    animations.push(["comparision2", pivotIdx, high]);
    swap(cpy_array, pivotIdx, high);

    let idx = low;
    for (let i = low; i < high; i++) {
        animations.push(["comparision1", i, high]);
        animations.push(["comparision2", i, high]);
        if (cpy_array[i] <= cpy_array[high]) {
            animations.push(["comparision1", i, idx]);
            animations.push(["swap", i, cpy_array[idx]]);
            animations.push(["swap", idx, cpy_array[i]]);
            animations.push(["comparision2", i, idx]);
            swap(cpy_array, i, idx);
            idx++;
        }
    }
    animations.push(["comparision1", idx, high]);
    animations.push(["swap", high, cpy_array[idx]]);
    animations.push(["swap", idx, cpy_array[high]]);
    animations.push(["comparision2", idx, high]);

    swap(cpy_array, idx, high);
    return idx;
}




const quickSortHelper = (cpy_array, left, right, animations) => {
    if (left === right) return;

    let pivot;
    if (left < right) {
        pivot = partition(cpy_array, left, right, animations);
        quickSortHelper(cpy_array, left, pivot - 1, animations);
        quickSortHelper(cpy_array, pivot + 1, right, animations);
    }
}


const quicksort = (array) => {
    let animations = [];
    let cpy_array = array.slice();

    quickSortHelper(cpy_array, 0, cpy_array.length - 1, animations);
    // array = cpy_array;

    // Some Final Test-Run
    const jsSortedArray = array.slice().sort((a, b) => a - b);
    console.log("Sort Works correctly:-", arrayAreEqual(cpy_array, jsSortedArray));

    return animations;
}

export default quicksort