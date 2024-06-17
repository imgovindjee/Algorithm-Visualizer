// GLOBAL VARIABLE DECLEARTION
var vis = []
var visitedNodes = []

// DIRECTIONS....
var dir_x = [2, -2, 0, 0]
var dir_y = [0, 0, 2, -2];


// functiont o get the nerighbours...
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

// function to handle the "FINDING THE PARENT AND PSUHING IT"
// t_x====> top.x
// t_y====> top.y
function findParentAndPush(t_x, t_y, n, m) {
    let choice = []

    // UPWARD
    if (t_x - 2 >= 0 && vis[t_x - 2][t_y]) {
        choice.push({ r: t_x - 2, c: t_y });
    }
    // DOWN 
    if (t_x + 2 < n && vis[t_x + 2][t_y]) {
        choice.push({ r: t_x + 2, c: t_y })
    }
    // LEFT
    if (t_y - 2 >= 0 && vis[t_x][t_y - 2]) {
        choice.push({ r: t_x, c: t_y - 2 })
    }
    // RIGHT
    if (t_y + 2 < m && vis[t_x][t_y + 2]) {
        choice.push({ r: t_x, c: t_y + 2 });
    }

    // EDGE CASE
    if (choice.length === 0) {
        return;
    }

    // searching parent{x,y} 
    const random = choice[(Math.floor(Math.random() * 100)) % choice.length];
    const pr = random.r
    const pc = random.c

    if (t_x === pr) {
        if (t_y < pc) {
            for (let i = pc - 1; i >= t_y; i--) {
                visitedNodes.push({ r: t_x, c: i })
            }
        } else {
            for (let i = pc + 1; i <= t_y; i++) {
                visitedNodes.push({ r: t_x, c: i })
            }
        }
    } else {
        if (t_x === pr) {
            for (let i = pr - 1; i >= t_x; i--) {
                visitedNodes.push({ r: i, c: t_y })
            }
        } else {
            for (let i = pr + 1; i <= t_x; i++) {
                visitedNodes.push({ r: i, c: t_y })
            }
        }
    }
}


// function to implemet the PRIM's ALGORITHM....
const helperPrims_MimimumSpanningTree = (n, m) => {
    let s = []

    let source = (Math.floor(Math.random() * 100)) % n
    source = (source % 2 === 0) ? source + 1 : source;
    source %= n;

    s.push({ x: source, y: source })

    // first Node....
    visitedNodes.push({ r: source, c: source });

    while (s.length > 0) {
        let top = s[(Math.floor(Math.random() * 100)) % s.length]
        vis[top.x][top.y] = true

        // search the parent Node
        findParentAndPush(top.x, top.y, n, m);

        s = [...(s.filter((item) => (JSON.stringify(item) !== JSON.stringify(top))))]

        let neighbours = getNeighbours(top, n, m)
        for (let i = 0; i < neighbours.length; i++) {
            const cx = neighbours[i][0]
            const cy = neighbours[i][1]

            s.push({ x: cx, y: cy });
        }
    }
}


// DRIVE FUNCTION
const primsAlgorithmMaze = (n, m) => {
    visitedNodes = []

    vis = new Array(n);
    // filling the visited array with value "FALSE"
    for (let i = 0; i < n; i++) {
        let arr = []
        for (let j = 0; j < m; j++) {
            arr.push(false)
        }
        vis[i] = arr
    }

    helperPrims_MimimumSpanningTree(n, m)
    return visitedNodes
}

export default primsAlgorithmMaze