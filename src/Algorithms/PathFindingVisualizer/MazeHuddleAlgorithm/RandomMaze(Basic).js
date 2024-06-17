function randomMazeBasic(row, col) {
    var arr = []
    for (let r = 0; r < row; r++) {
        const set = new Set()
        for (let idx = 0; idx < (col / 4); idx++) {
            var c = Math.floor((Math.random() * 100))
            c %= col
            set.add(c)
        }

        for (let c of set) {
            arr.push({ r, c });
        }
    }
    return arr
}

export default randomMazeBasic