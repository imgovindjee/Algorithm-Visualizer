// GLOBAL DECLERATION
var vis = []
var visitedNodes = []


// directions..
var dir_x = [2, -2, 0, 0]
var dir_y = [0, 0, 2, -2]


// function to handle the MOVE-FORWARD 
function goForward(pr, pc, r, c) {
    // ROW IS SAME
    if (r === pr) {
        if (c < pc) {
            for (let i = pc; i >= c; i--) {
                if (vis[r][i]) {
                    continue
                }
                visitedNodes.push({ r, c: i })
                vis[r][i] = true;
            }
        } else {
            for (let i = pc; i <= c; i++) {
                if (vis[r][i]) {
                    continue
                }
                visitedNodes.push({ r, c: i })
                vis[r][i] = true;
            }
        }
    } else {
        if (r < pr) {
            for (let i = pr; i >= r; i--) {
                if (vis[i][c]) {
                    continue
                }
                visitedNodes.push({ r: i, c })
                vis[i][c] = true;
            }
        } else {
            for (let i = pr; i <= r; i++) {
                if (vis[i][c]) {
                    continue
                }
                visitedNodes.push({ r: i, c })
                vis[i][c] = true;
            }
        }
    }
}


// function to handle the getNeighbour
function getNeighbour(top, n, m) {
    let arr = []
    for (let i = 0; i < 4; i++) {
        let x = top.x + dir_x[i]
        let y = top.y + dir_y[i]

        if (x >= 0 && x < n && y >= 0 && y < m && !vis[x][y]) {
            arr.push([x, y])
        }
    }
    return arr
}

// function to build the array
/*
    MAX_n=100*row+col
    MOD=100
    row=20 //MAX
    col=99 //MAX

    MAX_n = 20 * 100 + 99 = 2099
*/

const MAX_n = 2100
var p = new Array(MAX_n)
var sz = new Array(MAX_n)

const Build = (n) => {
    for (let i = 0; i <= n; i++) {
        p[i] = i
        sz[i] = i
    }
}

// function to find element
const Find = (elm) => {
    return (
        elm === p[elm] ? (
            elm
        ) : (
            p[elm] = Find(p[elm])
        )
    )
}

// function to  find UNION 
const Union = (a, b) => {
    a = Find(a)
    b = Find(b)

    if (sz[a] < sz[b]) {
        [a, b] = [b, a];
    }

    p[b] = a;
    sz[a] += sz[b];
}



// function to handle the 
// KRUSHKAL ALGORITHM
const helperKruskalRun = (n, m) => {
    let edges = []
    // push all edge of the grid
    for (let i = 0; i < n; i += 2) {
        for (let j = 0; j < m; j += 2) {
            if (j >= 2) {
                edges.push({ x1: i, y1: j - 2, x2: i, y2: j });
            }
            if (i >= 2) {
                edges.push({ x1: i - 2, y1: j, x2: i, y2: j });
            }
        }
    }

    Build(n * 100 + m + 5);
    while (edges.length > 0) {
        // select random edge....
        let generated_randomID = Math.floor((Math.random() * 100) % edges.length)
        let px = edges[generated_randomID].x1;
        let py = edges[generated_randomID].y1
        let cx = edges[generated_randomID].x2
        let cy = edges[generated_randomID].y2

        // REMOVE EDGE FROM LIST
        edges.splice(generated_randomID, 1);

        // CHECK if they are in same component
        const a = Find(px * 100 + py)
        const b = Find(cx * 100 + cy)
        if (a !== b) {
            goForward(px, py, cx, cy);
            Union(a, b);
        }
    }
}




// DRIVE FUNCTION
const kruskalAlgorithm = (n, m) => {
    visitedNodes = []
    
    vis = new Array(n)
    // filling the visited array with value "FALSE"
    for (let i = 0; i < n; i++) {
        let arr = [];
        for (let j = 0; j < m; j++) {
            arr.push(false)
        }
        vis[i] = arr
    }

    helperKruskalRun(n, m);
    return visitedNodes
}

export default kruskalAlgorithm