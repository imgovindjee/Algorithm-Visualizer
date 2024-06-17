// // function to handle the "insertion sort"
// function helperInsertionSort(helperArray, animations) {
//     const len = helperArray.length
//     for (let i = 1; i < len; i++) {
//         let currentValue = helperArray[i]
//         let j = i - 1
//         animations.push(["comparision1", j, i])
//         animations.push(["comparision2", j, i])
//         while (j >= 0 && helperArray[j] > currentValue) {
//             animations.push(["overwrite", j + 1, helperArray[j]])
//             helperArray[j + 1] = helperArray[j]
//             j = j - 1;

//             if (j >= 0) {
//                 animations.push(['comparision1', j, i])
//                 animations.push(["comparision2", j, i])
//             }
//         }

//         animations.push('"overwrite', j + 1, currentValue)
//         helperArray[j + 1] = currentValue
//     }
// }



// // DRIVE FUNCTION
// function insertionsort(array) {
//     let animations = []
//     let helperArray = array.slice()

//     helperInsertionSort(helperArray, animations)
//     return animations;
// }

// export default insertionsort


function insertionsort(array) {
    let animations = [];
    let helperArray = array.slice();
    HelperInsertionSort(helperArray, animations);
    return animations;
}

function HelperInsertionSort(helperArray, animations) {
    const length = helperArray.length;
    for (let i = 1; i < length; i++) {
        let position = helperArray[i];
        let j = i - 1;
        animations.push(["comparison1", j, i]);
        animations.push(["comparison2", j, i]);
        while (j >= 0 && helperArray[j] > position) {
            animations.push(["overwrite", j + 1, helperArray[j]]);
            helperArray[j + 1] = helperArray[j];
            j = j - 1;
            if (j >= 0) {
                animations.push(["comparison1", j, i]);
                animations.push(["comparison2", j, i]);
            }
        }
        animations.push(["overwrite", j + 1, position]);
        helperArray[j + 1] = position;
    }
}

export default insertionsort