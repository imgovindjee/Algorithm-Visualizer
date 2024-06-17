function helperCountSort(auxillary_Array, animations) {
    const len = auxillary_Array.length

    let count = []
    const k = 1000; //although the max-height of the array-abr is "400"
    for (let i = 0; i < k; i++) {
        count[i] = 0;
    }

    // counting the frequency of each number(.ie. bar-count of height)
    for (let i = 0; i < len; i++) {
        count[auxillary_Array[i]]++;
    }

    let idx = 0;
    for (let i = 0; i < k; i++) {
        for (let j = 0; j < count[i]; j++) {
            animations.push(["comparision1", idx])
            animations.push(["comparision2", idx])
            animations.push(["overwrite", idx, i])

            auxillary_Array[idx] = i;
            idx++;
        }
    }
}



// DRIVE FUNCTION
export default function countsort(array) {
    let animations = []
    let auxillary_Array = array.slice()

    helperCountSort(auxillary_Array, animations)
    return animations;
}