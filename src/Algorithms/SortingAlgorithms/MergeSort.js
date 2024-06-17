// Function to merge the array
function merge(array, start, mid, end, auxillary_Array, animations) {
    // Starting of array l_arr where element are from (start to mid) 
    let i = start;
    // starting of the array r_arr where element are from (mid+1 to end)
    let j = mid + 1;
    // As the previous all the element are sorted  
    let idx = start;
    while (i <= mid && j <= end) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([i, j]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([i, j]);
        if (auxillary_Array[i] < auxillary_Array[j]) {
            // We overwrite the value at index k in the original array with the
            // value at index i in the auxiliary array.
            animations.push([idx, auxillary_Array[i]]);
            array[idx++] = auxillary_Array[i++];
        } else {
            // We overwrite the value at index k in the original array with the
            // value at index j in the auxiliary array.
            animations.push([idx, auxillary_Array[j]]);
            array[idx++] = auxillary_Array[j++];
        }
    }


    // if any element is left inside the l_arr
    while (i <= mid) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([i, i]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([i, i]);
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([idx, auxillary_Array[i]]);
        array[idx++] = auxillary_Array[i++];
    }


    // if any element id left inside the r_arr
    while (j <= end) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([j, j]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([j, j]);
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([idx, auxillary_Array[j]]);
        array[idx++] = auxillary_Array[j++];
    }
}



// FUNCTION HELPING IN THE PARTATION OF THE ARRAY
function mergeSortHelper(array, start, end, auxillary_Array, animations) {
    // Base Case
    if (start === end) return;

    const mid = Math.floor((end + start) / 2);
    mergeSortHelper(auxillary_Array, start, mid, array, animations);
    mergeSortHelper(auxillary_Array, mid + 1, end, array, animations);
    merge(array, start, mid, end, auxillary_Array, animations);

}


// DRIVE FUNCTION
function mergesort(array) {
    // Base Case
    if (array.length <= 1) {
        return array;
    }

    const animations = [];
    const auxillary_Array = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxillary_Array, animations);
    console.log(array)
    return animations;
}

export default mergesort