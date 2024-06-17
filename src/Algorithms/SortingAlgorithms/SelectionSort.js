import swap from "./Swap";

// function to handle "selection sort" 
function helperSelectionSort(helperArray, animations) {
    const len = helperArray.length
    for (let i = 0; i < len; i++) {
        let idx = i
        for (let j = i + 1; j < len; j++) {
            animations.push(["comparision1", idx, j])
            animations.push(["comparision2", idx, j])

            if (helperArray[j] < helperArray[idx]) {
                idx = j;
            }
        }

        animations.push(["swap", i, helperArray[idx]])
        animations.push(["swap", idx, helperArray[i]])
        swap(helperArray, i, idx);
    }
}



// DRIVE FUNCTION
function selectionsort(array) {
    let animations = []
    let helperArray = array.slice()

    helperSelectionSort(helperArray, animations)
    return animations
}

export default selectionsort