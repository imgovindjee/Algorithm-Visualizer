// DIRECTION
var dir_x = [1, -1, 0, 0]
var dir_y = [0, 0, 1, -1]



// DRIVE FUNCTION
function dijkstra(grid, startNode, endNode, n, m) {
    // new Array formation...
    var _grid = new Array(n)
    for (let i = 0; i < n; i++) {
        let arr = []
        for (let j = 0; j < m; j++) {
            arr.push({ x: -1, y: -1, distance: 1e9 })
        }
        _grid[i] = arr;
    }

    var visitedNodes = []
    var path = []


    // PRIORITY-QUEUE DS
    var pq = []
    pq.push({ cost: 0, x: startNode.x, y: startNode.y })
    _grid[startNode.x][startNode.y].distance = 0
    visitedNodes.push({ x: startNode.x, y: startNode.y });

    while (pq.length > 0) {
        pq.sort((a, b) => a - b);

        var top_of_pq = pq.shift()
        if (top_of_pq.cost !== _grid[top_of_pq.x][top_of_pq.y].distance) {
            continue
        }

        for (let i = 0; i < 4; i++) {
            var x = top_of_pq.x + dir_x[i]
            var y = top_of_pq.y + dir_y[i]
            if (!(x >= 0 && x < n && y >= 0 && y < m) || grid[x][y].isWall) {
                continue
            }

            // searching for optimal path
            if (x === endNode.x && y === endNode.y) {
                visitedNodes.push({ x, y })
                _grid[x][y].x = top_of_pq.x
                _grid[x][y].y = top_of_pq.y
                var temp = { x, y }
                path.push({ x: temp.x, y: temp.y })

                while (_grid[temp.x][temp.y].x !== -1 || _grid[temp.x][temp.y].y !== -1) {
                    let temp_x = _grid[temp.x][temp.y].x
                    let temp_y = _grid[temp.x][temp.y].y
                    temp.x = temp_x
                    temp.y = temp_y
                    path.push({ x: temp.x, y: temp.y })
                }
                return { path, visitedNodes, error: '' }
            } else if (_grid[x][y].distance > (1 + _grid[top_of_pq.x][top_of_pq.y].distance)) {
                _grid[x][y].distance = 1 + _grid[top_of_pq.x][top_of_pq.y].distance
                _grid[x][y].x = top_of_pq.x
                _grid[x][y].y = top_of_pq.y

                visitedNodes.push({ x, y })
                pq.push({ cost: _grid[x][y].distance, x, y });
            }
        }
    }

    return { path, visitedNodes, error: "Path not Found" };
}

export default dijkstra