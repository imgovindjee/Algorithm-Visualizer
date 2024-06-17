// GLOBAL VARIABLE DECLEARTION
var visitedNodes = []
var vis = []



// function to handle the division
function helperDivision(startRow, endRow, startCol, endCol) {
    // BASE CASE
    if (endRow - startRow <= 1 && endCol - startCol <= 1) {
        return;
    }

    // ROW-ONLY
    if (endRow - startRow > endCol - startCol) {
        let mid = Math.floor((startRow + endRow) / 2)
        let generated_randomID = Math.floor((Math.random() * 100) % (endCol - startCol + 1)) + startCol;

        let start = startCol
        if (vis[mid][startCol - 1] === false) {
            generated_randomID = start
            start++
        }

        let end = endCol
        if (vis[mid][endCol - 1] === false) {
            generated_randomID = end;
            end--
        }

        for (let i = start; i <= end; i++) {
            if (i !== generated_randomID) {
                visitedNodes.push({ r: mid, c: i })
                vis[mid][i] = true
            }
        }

        // RECURSION-1
        helperDivision(startRow, mid - 1, startCol, endCol)
        helperDivision(mid + 1, endRow, startCol, endCol)
    }

    // COLUMN-ONLY
    else {
        let mid = Math.floor((startCol + endCol) / 2)
        let generated_randomID = Math.floor((Math.random() * 100) % (endRow - startRow + 1)) + startRow

        let start = startRow
        if (vis[startRow - 1][mid] === false) {
            generated_randomID = start
            start++
        }

        let end = endRow
        if (vis[end + 1][mid] === false) {
            generated_randomID = end
            end--
        }

        for (let i = start; i <= end; i++) {
            if (i !== generated_randomID) {
                visitedNodes.push({ r: i, c: mid })
                vis[i][mid] = true
            }
        }

        // RECURSION-2
        helperDivision(startRow, endRow, startCol, mid - 1)
        helperDivision(startRow, endRow, mid + 1, endCol)
    }
}


// DRIVE FUNCTION
function recurisveDivision(n, m) {
    visitedNodes = []
    vis = new Array(n)
    for (let i = 0; i < n; i++) {
        let arr = []
        for (let j = 0; j < m; j++) {
            arr.push(false)
        }
        vis[i] = arr
    }

    // TRAVELLING ALL-AROUND GRID
    for (let i = 0; i < m; i++) {
        visitedNodes.push({ r: 0, c: i })
        vis[0][i] = true
    }
    for (let i = 0; i < n; i++) {
        visitedNodes.push({ r: i, c: m - 1 })
        vis[i][m - 1] = true
    }
    for (let i = m - 2; i >= 0; i--) {
        visitedNodes.push({ r: n - 1, c: i })
        vis[n - 1][i] = true
    }
    for (let i = n - 2; i > 0; i--) {
        visitedNodes.push({ r: i, c: 0 })
        vis[i][0] = true
    }

    helperDivision(1, n - 2, 1, m - 2);
    return visitedNodes;
}

export default recurisveDivision