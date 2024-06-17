import swap from "./Swap"

function arrayAreEqual(rsArray, jsArray) {
    if (rsArray.length !== jsArray.length) {
        return false;
    }

    for (let i = 0; i < rsArray.length; i++) {
        if (rsArray[i] !== jsArray[i]) {
            return false;
        }
    }
    return true;
}



// Max-heap Build
const heapify = (helperArray, len, idx, animations) => {
    let largest = idx;
    let left = (2 * idx) + 1;
    let right = (2 * idx) + 2;

    if (left < len && helperArray[left] > helperArray[largest]) {
        animations.push(["comparision1", largest, left]);
        animations.push(["comparision2", largest, left]);
        largest = left;
    }

    if (right < len && helperArray[right] > helperArray[largest]) {
        animations.push(["comparision1", largest, right]);
        animations.push(["comparision2", largest, right]);
        largest = right;
    }

    if (largest !== idx) {
        animations.push(["swap", idx, helperArray[largest]]);
        animations.push(["swap", largest, helperArray[idx]]);

        swap(helperArray, idx, largest);

        heapify(helperArray, len, largest, animations);
    }
}

// function to handle HEAP-SORT
const helperHeapSort = (helperArray, animations) => {
    // heapSize
    const len = helperArray.length;

    for (let i = (len - 2) / 2; i >= 0; i--) {
        heapify(helperArray, len, i, animations);
    }

    for (let i = len - 1; i > 0; i--) {
        animations.push(["swap", i, helperArray[0]]);
        animations.push(["swap", 0, helperArray[i]]);

        swap(helperArray, i, 0);

        heapify(helperArray, i, 0, animations);
    }
}

// DRIVE FUNCTION
export function heapsort(array) {
    let animations = [];
    let helperArray = array.slice();
    helperHeapSort(helperArray, animations);

    // Some Final Test-Run
    const jsSortedArray = array.slice().sort((a, b) => a - b);
    console.log("Sort Works correctly:-", arrayAreEqual(helperArray, jsSortedArray));
    console.log(helperArray);
    // console.log(jsSortedArray);
    return animations;
}