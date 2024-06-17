// GLOBAL DECLERATIONS....
var visitedNodes = []
var vis = []

// DIRECTIONS...
var dir_x = [+2, -2, 0, 0]
var dir_y = [0, 0, +2, -2]


// function to move formnerd
// t_x->top-of-stck.x{parent-row}
// t_y->top-of-stck.y(parent-col)
// c_x->current_x
// c_y->current_y
function goForward(t_x, t_y, c_x, c_y) {
    if (c_x === t_x) {
        if (c_y < t_y) {
            for (let i = t_y - 1; i >= c_y; i--) {
                visitedNodes.push({ r: c_x, c: i })
            }
        } else {
            for (let i = t_y + 1; i <= c_y; i++) {
                visitedNodes.push({ r: c_x, c: i })
            }
        }
    } else {
        if (c_x < t_x) {
            for (let i = t_x - 1; i >= c_x; i--) {
                visitedNodes.push({ r: i, c: c_y })
            }
        } else {
            for (let i = t_x + 1; i <= c_x; i++) {
                visitedNodes.push({ r: i, c: c_y })
            }
        }
    }
}

// function to gte neighbours
function getNeighbours(top, n, m) {
    let arr = []
    for (let i = 0; i < 4; i++) {
        let x = top.x + dir_x[i]
        let y = top.y + dir_y[i]
        if (x >= 0 && x < n && y >= 0 && y < m && !vis[x][y]) {
            arr.push([x, y]);
        }
    }
    return arr
}


// function to help the MAZE CREATION USING DFS
function helper_DFS(n, m, r, c) {
    vis[r][c] = true
    visitedNodes.push({ r, c })

    // stack 
    var stck = []
    stck.push({ x: r, y: c })
    while (stck.length > 0) {
        let top_of_stck = stck[stck.length - 1]

        let neighbours = getNeighbours(top_of_stck, n, m)
        if (neighbours.length) {
            let generated_randomID = (Math.floor(Math.random() * 10)) % neighbours.length

            let curr_x = neighbours[generated_randomID][0]
            let curr_y = neighbours[generated_randomID][1]

            goForward(top_of_stck.x, top_of_stck.y, curr_x, curr_y)
            stck.push({ x: curr_x, y: curr_y })
            vis[curr_x][curr_y] = true;
        } else {
            stck.pop()
        }
    }
}



// DRIVE FUNCTION
function randomizedMaze_DFS(n, m) {
    visitedNodes = []

    vis = new Array(n)
    // filling the visited array with value "FALSE"
    for (let i = 0; i < n; i++) {
        let arr = []
        for (let j = 0; j < m; j++) {
            arr.push(false)
        }
        vis[i] = arr
    }

    helper_DFS(n, m, 1, 1);
    return visitedNodes;
}

export default randomizedMaze_DFS