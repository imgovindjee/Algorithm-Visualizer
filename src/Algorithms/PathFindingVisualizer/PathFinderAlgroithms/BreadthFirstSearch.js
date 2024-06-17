
// DIRECTIONS...
var dir_x = [0, 0, 1, -1]
var dir_y = [1, -1, 0, 0]


// BFS ALGROITHM....
// n ---> row
// m ---> col
function breadthfirstsearch(grid, startNode, endNode, n, m) {
    // new Array formation...
    var _grid = new Array(n)
    for (let i = 0; i < n; i++) {
        let arr = []
        for (let j = 0; j < m; j++) {
            arr.push({ x: -1, y: -1, visited: 0 })
        }
        _grid[i] = arr;
    }

    var visitedNodes = []
    var path = []

    // queue DS
    var queue = []
    queue.push({ x: startNode.x, y: startNode.y })
    _grid[startNode.x][startNode.y].visited = 1
    visitedNodes.push({ x: startNode.x, y: startNode.y });

    while (queue.length > 0) {
        var top_of_queue = queue.shift()

        for (let i = 0; i < 4; i++) {
            var x = top_of_queue.x + dir_x[i]
            var y = top_of_queue.y + dir_y[i]

            if (x === endNode.x && y === endNode.y) {
                visitedNodes.push({ x, y })
                _grid[x][y].x = top_of_queue.x
                _grid[x][y].y = top_of_queue.y

                var temp = { x, y }
                path.push({ x: temp.x, y: temp.y })

                while (_grid[temp.x][temp.y].x !== -1 || _grid[temp.x][temp.y].y !== -1) {
                    let temp_x = _grid[temp.x][temp.y].x
                    let temp_y = _grid[temp.x][temp.y].y
                    temp.x = temp_x
                    temp.y = temp_y
                    path.push({ x: temp.x, y: temp.y });
                }
                return { path, visitedNodes, error: "" }
            } else if (x >= 0 && x < n && y >= 0 && y < m && !grid[x][y].isWall && !_grid[x][y].visited) {
                _grid[x][y].visited = 1;
                visitedNodes.push({ x, y })

                _grid[x][y].x = top_of_queue.x
                _grid[x][y].y = top_of_queue.y
                queue.push({ x, y });
            }
        }
    }

    return { path, visitedNodes, error: "Path isn't found" }
}

export default breadthfirstsearch