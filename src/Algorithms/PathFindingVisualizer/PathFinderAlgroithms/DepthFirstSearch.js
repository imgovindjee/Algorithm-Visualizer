// DIRECTION
var dir_x = [1, -1, 0, 0]
var dir_y = [0, 0, 1, -1]


// GLOBAL VARIABLE DECLERATION
var visitedNodes = []
var _grid = []
var path = []


// function for the DFS-search
function helper_DFS(grid, endNode, r, c, n, m) {
    _grid[r][c].visited = 1
    visitedNodes.push({ x: r, y: c })

    // stack DS
    let stck = []
    stck.push({ r, c })
    while (stck.length > 0) {
        let top_of_stck = stck[stck.length - 1]

        let neighbours = []

        // travelling in all possible directions
        for (let i = 0; i < 4; i++) {
            let x = top_of_stck.r + dir_x[i]
            let y = top_of_stck.c + dir_y[i]
            if (x >= 0 && x < n && y >= 0 && y < m && !grid[x][y].isWall && !_grid[x][y].visited) {
                neighbours.push({ x, y })
            }
        }

        if (neighbours.length > 0) {
            var getRandom = (Math.floor(Math.random() * 10)) % neighbours.length
            let x = neighbours[getRandom].x
            let y = neighbours[getRandom].y

            if (x === endNode.x && y === endNode.y) {
                visitedNodes.push({ x, y })
                _grid[x][y].x = top_of_stck.r
                _grid[x][y].y = top_of_stck.c

                return 1;
            } else if (x >= 0 && x < n && y >= 0 && y < m && !grid[x][y].isWall && !_grid[x][y].visited) {
                _grid[x][y].x = top_of_stck.r
                _grid[x][y].y = top_of_stck.c
                _grid[x][y].visited = 1

                visitedNodes.push({ x, y })
                stck.push({ r: x, c: y })
            }
        } else {
            stck.pop()
        }
    }
    return 0;
}



// DRIVE FUNCTION
// n ---> row
// m ---> col
function depthfirstsearch(grid, startNode, endNode, n, m) {
    visitedNodes = []
    path = [] // every running in search of NEW--PATH

    _grid = new Array(n)
    for (let i = 0; i < n; i++) {
        let arr = []
        for (let j = 0; j < m; j++) {
            arr.push({ x: -1, y: -1, visited: 0 })
        }
        _grid[i] = arr
    }


    // DFS SEARCH....
    helper_DFS(grid, endNode, startNode.x, startNode.y, n, m)

    // Edge case
    if (_grid[endNode.x][endNode.y].x === -1 && _grid[endNode.x][endNode.y].y === -1) {
        return { path, visitedNodes, error: "Path Not found" }
    }

    var temp = { x: endNode.x, y: endNode.y }
    path.push({ x: temp.x, y: temp.y })
    while (_grid[temp.x][temp.y].x !== -1 || _grid[temp.x][temp.y].y !== -1) {
        let temp_x = _grid[temp.x][temp.y].x
        let temp_y = _grid[temp.x][temp.y].y
        temp.x = temp_x
        temp.y = temp_y

        path.push({ x: temp.x, y: temp.y });
    }
    return {path, visitedNodes, error:""}
}

export default depthfirstsearch