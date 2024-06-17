// function to retun the maximum from array of length[len]
function getMaximium(auxillary_Array, len) {
    let max = auxillary_Array[0]
    for (let i = 1; i < len; i++) {
        if (auxillary_Array[i] > max) {
            max = auxillary_Array[i]
        }
    }
    return max;
}

// function helping in the count Sort
function countsort(auxiliary_Array, len, exp, animations) {
    let output = new Array(len)

    // stores number of digits
    let count = new Array(10)
    for (let i = 0; i < 10; i++) {
        count[i] = 0;
    }

    // from the array--->auxillary_Array
    for (let i = 0; i < len; i++) {
        animations.push(["comparision1", i])
        animations.push(["comparision2", i])

        count[Math.floor(auxiliary_Array[i] / exp) % 10]++;
    }

    // prefix sum
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1]
    }

    for (let i = len - 1; i >= 0; i--) {
        animations.push(["comparision1", i])
        animations.push(["comparision2", i])
        animations.push(["overwrite", count[Math.floor(auxiliary_Array[i] / exp) % 10] - 1, auxiliary_Array[i]])

        output[count[Math.floor(auxiliary_Array[i] / exp) % 10] - 1] = auxiliary_Array[i]
        count[Math.floor(auxiliary_Array[i] / exp) % 10]--;
    }

    for (let i = 0; i < len; i++) {
        auxiliary_Array[i] = output[i];
    }
}

// function to hanlde THE RADIX SORT
function helperRadixSort(auxillary_Array, animations) {
    let len = auxillary_Array.length
    let max = getMaximium(auxillary_Array, len)
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
        countsort(auxillary_Array, len, exp, animations)
    }
}



// DRIVE FUNCTION
export default function radixsort(array) {
    let animations = []
    let auxillary_Array = array.slice()

    helperRadixSort(auxillary_Array, animations)
    return animations
}