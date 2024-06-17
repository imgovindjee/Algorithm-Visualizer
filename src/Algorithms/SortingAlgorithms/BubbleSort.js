import swap from "./Swap"

// function to do the bubblesort
const bubbleSortHelper = (cpy_array, animations) => {
    const len = cpy_array.length
    let idx = len - 1
    while (idx > 0) {
        let flag = false
        for (let i = 0; i < idx; i++) {
            animations.push(['comparision1', i, i + 1])
            animations.push(['comparision2', i, i + 1])

            if (cpy_array[i] > cpy_array[i + 1]) {
                flag = true
                animations.push(['swap', i, cpy_array[i + 1]])
                animations.push(['swap', i + 1, cpy_array[i]])
                swap(cpy_array, i, i + 1);
            }
        }

        if (!flag) {
            break;
        }
        idx--;
    }
}


// DRIVE FUNCTION
const bubblesort = (array) => {
    let animations = []
    let cpy_array = array.slice()

    bubbleSortHelper(cpy_array, animations)
    return animations
}

export default bubblesort