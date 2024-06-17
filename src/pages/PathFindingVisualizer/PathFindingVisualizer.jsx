import React, { useEffect, useState } from 'react'

import toast, { Toaster } from 'react-hot-toast';

import Button from '../../components/Button/Button';
import CheckBox from '../../components/CheckBox/CheckBox';

// MAZE/HUDDLES Generation ALGORITM....
import randomMazeBasic from '../../Algorithms/PathFindingVisualizer/MazeHuddleAlgorithm/RandomMaze(Basic)';
import randomizedMaze_DFS from '../../Algorithms/PathFindingVisualizer/MazeHuddleAlgorithm/RandomizedMaze(DFS)';
import recurisveDivision from '../../Algorithms/PathFindingVisualizer/MazeHuddleAlgorithm/RecursiveDivision';
import kruskalAlgorithm from '../../Algorithms/PathFindingVisualizer/MazeHuddleAlgorithm/KruskalMazeAlgortihm';
import primsAlgorithmMaze from '../../Algorithms/PathFindingVisualizer/MazeHuddleAlgorithm/PrimsMazeAlgorithm';

// PATH FINDING ALGORITHs....
import breadthfirstsearch from '../../Algorithms/PathFindingVisualizer/PathFinderAlgroithms/BreadthFirstSearch';
import depthfirstsearch from '../../Algorithms/PathFindingVisualizer/PathFinderAlgroithms/DepthFirstSearch';
import dijkstra from '../../Algorithms/PathFindingVisualizer/PathFinderAlgroithms/Dijkstra';


import "./PathFindingVisualizer.css"
import PageAnimationWrapper from '../../common/PageAnimationWrapper/PageAnimationWrapper';
// import "./PathFindingVisualizer.scss"





// Type of algorithm used for visulaization of the path
const pathFinderAlgorithm = ['Breadth-First-Search (BFS)', 'Depth-First-Search (DFS)', 'Dijkstra']

// Huddle/maze DIVISION
const huddlesTypes = ['Random Maze (BASIC)', 'DFS-Randomized Type', 'Kruskal Algorithm', "Prim's Algorithm", 'Recursive Division']

var row = 13;
var col = 31;

// Defining the row on the screen basic
const CELL_SIZE = 30;
const PADDING = 200;
const MAX_ROW = Math.floor((window.innerHeight - PADDING) / CELL_SIZE);
if (MAX_ROW > row) {
    row = MAX_ROW >= 19 ? 19 : MAX_ROW // ROW = "13" or "19"
}

// starting row/col POINT
var START_ROW_NODE = 4;
var START_COL_NODE = 6;

// ending row/col point
var END_ROW_NODE = 6;
var END_COL_NODE = 26;

// INITIAL STARTING ROW-COL VALUE
var INITIAL_ROW_START = START_ROW_NODE
var INITIAL_COL_START = START_COL_NODE
var INITIAL_ROW_END = END_ROW_NODE
var INITIAL_COL_END = END_COL_NODE


// SPEED(ms) of visualization
const SLOW = 50
const FAST = 5
const MEDIUM = 15 //AVG

// DEFAULT SPEED of ANIMATIONS
var ANIIMATION_SPEED_DEFAULT = MEDIUM


// new class
// to make the SPOT ==> OBJECT
class Spot {
    constructor(i, j) {
        this.x = i;
        this.y = j;
        this.isWall = false
        this.isStart = i === START_ROW_NODE && j === START_COL_NODE
        this.isEnd = i === END_ROW_NODE && j === END_COL_NODE
    }
}


// NODE MAKING....
function Node({ p_values }) {
    // destructuring the values..
    const { x, y, isStart, isEnd, isWall, onMouseDown, onMouseEnter, onMouseUp, setStartEndNode } = p_values

    const allowDrop = (e) => {
        e.preventDefault()
    }

    const drag = (e) => {
        e.dataTransfer.setData("myID", e.target.id)
    }

    const drop = (e) => {
        e.preventDefault()
        // console.log(e);

        var data = e.dataTransfer.getData("myID")
        // console.log(data)
        var dom = document.getElementById(data)
        // console.log(dom)
        var id = parseInt(dom.attributes.data_type.value)
        // console.log(id)
        // console.log(e.target.attributes.data_x.value==="3")
        // console.log(e.target.attributes.wall.value)
        if (e.target.attributes.data_type.value !== "3" || e.target.attributes.wall.value === "true") {
            return;
        }

        // function call
        var row1 = parseInt(e.target.attributes.data_x.value)
        var col1 = parseInt(e.target.attributes.data_y.value)
        // console.log({row1, col1});
        setStartEndNode(id, row1, col1);
    }

    // // 1. handling the mouse events
    // const handleNodeMouseDown = (e) => {
    //     e.preventDefault()

    //     onMouseDown(x, y)
    // }

    // // 2. handling the mouse events
    // const handleNodeMouseEnter = (e) => {
    //     e.preventDefault()

    //     onMouseEnter(x, y)
    // }

    // // 3. handling the mouse events
    // const handleNodeMouseUp = (e) => {
    //     e.preventDefault()

    //     onMouseUp()
    // }


    var classNode = isStart ? (
        "START_NODE cursor-grab"
    ) : (
        isEnd ? (
            "END_NODE cursore-grab"
        ) : (
            isWall ? (
                "obtacle"
            ) : (
                ""
            )
        )
    )
    var typeId = isStart ? "1" : isEnd ? "2" : "3"

    if (isStart || isEnd) {
        return (
            <div
                className={"square " + classNode}
                id={"row" + x + "_col" + y}
                data_x={x}
                data_y={y}
                data_type={typeId}
                wall="false"
                draggable="true"
                onDragStart={drag}
                onDrop={drop}
                onDragOver={allowDrop}
            >
            </div>
        )
    } else {
        return (
            <div
                className={"square " + classNode}
                id={"row" + x + "_col" + y}
                data_x={x}
                data_y={y}
                data_type={typeId}
                wall={isWall.toString()}
                onDrop={drop}
                onDragOver={allowDrop}
                onMouseDown={(e) => {
                    e.preventDefault()
                    onMouseDown(x, y);
                }}
                onMouseUp={(e) => {
                    e.preventDefault()
                    onMouseUp();
                }}
                onMouseEnter={(e) => {
                    e.preventDefault()
                    onMouseEnter(x, y);
                }}
            >
            </div>
        )
    }
}

// Animation Effect
async function animationEffect(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("")
        }, time);
    })
}


const PathFindingVisualizer = () => {

    // hooks
    // for setting up the row-grid
    const [grid, setGrid] = useState([])

    // for setting up the different animations time
    const [animationType, setAnimationType] = useState(2)

    // setting the mazeID and PathID
    const [mazeID, setMazeID] = useState(0)
    const [pathID, setPathID] = useState(0);

    // state to handle the mousePress
    const [isMousePress, setIsMousePress] = useState(false)


    // function to initailize the grid....
    const makeGridInitially = () => {
        var _grid = new Array(row)
        for (let i = 0; i < row; i++) {
            _grid[i] = new Array(col)
        }

        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                _grid[i][j] = new Spot(i, j)
            }
        }
        setGrid(_grid);
    }

    // REAL-time rendering of the grid
    useEffect(() => {
        makeGridInitially();
    }, [])



    // animation for the visited nodes...
    async function animateVisitedNode(visitedNodes) {
        for (let i = 0; i < visitedNodes.length; i++) {
            const node = visitedNodes[i]
            await animationEffect(ANIIMATION_SPEED_DEFAULT)

            if (node.x === START_ROW_NODE && node.y === START_COL_NODE) {
                document.getElementById(`row${node.x}_col${node.y}`).className = "node-visited START_NODE cursor-grab"
            } else if (node.x === END_ROW_NODE && node.y === END_COL_NODE) {
                document.getElementById(`row${node.x}_col${node.y}`).className = "node-visited END_NODE cursor-grab"
            } else {
                document.getElementById(`row${node.x}_col${node.y}`).className = "node-visited"
            }
        }
    }

    // animation for the shortest Path Possible...
    async function animateShortedPath(pathNode) {
        pathNode.reverse()
        for (let i = 0; i < pathNode.length; i++) {
            const node = pathNode[i]
            await animationEffect(ANIIMATION_SPEED_DEFAULT)

            if (i === 0) {
                document.getElementById(`row${node.x}_col${node.y}`).className = "shortestPath START_NODE cursor-grab"
            } else if ((i + 1) === pathNode.length) {
                document.getElementById(`row${node.x}_col${node.y}`).className = "shortestPath END_NODE cursor-grab"
            } else {
                document.getElementById(`row${node.x}_col${node.y}`).className = "shortestPath"
            }
        }
    }


    // function to handle the path-finder(search for the optimal path)
    const handlePathFinder = async () => {
        var btns = document.getElementsByClassName("btn-selector")
        document.getElementsByTagName("select")[0].disabled = true
        document.getElementsByTagName("select")[1].disabled = true
        for (let i = 0; i < btns.length; i++) {
            btns[i].disabled = true;
        }

        var startNode = grid[START_ROW_NODE][START_COL_NODE]
        var endNode = grid[END_ROW_NODE][END_COL_NODE]
        if (pathID === 1) {
            var animaiation = breadthfirstsearch(grid, startNode, endNode, row, col)
            await animateVisitedNode(animaiation.visitedNodes)
            await animateShortedPath(animaiation.path);
        } else if (pathID === 2) {
            var animaiation = depthfirstsearch(grid, startNode, endNode, row, col)
            await animateVisitedNode(animaiation.visitedNodes)
            await animateShortedPath(animaiation.path)
        } else if (pathID === 3) {
            var animaiation = dijkstra(grid, startNode, endNode, row, col)
            await animateVisitedNode(animaiation.visitedNodes)
            await animateShortedPath(animaiation.path)
        }


        document.getElementsByTagName("select")[0].disabled = false
        document.getElementsByTagName("select")[1].disabled = false
        for (let i = 0; i < btns.length; i++) {
            btns[i].disabled = false;
        }
    }

    // function to handle the clear-path
    const handleClearPath = (e) => {
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                if (i === START_ROW_NODE && j === START_COL_NODE) {
                    document.getElementById(`row${i}_col${j}`).className = "square START_NODE cursor-grab"
                } else if (i === END_ROW_NODE && j === END_COL_NODE) {
                    document.getElementById(`row${i}_col${j}`).className = "square END_NODE cursor-grab"
                } else if (!grid[i][j].isWall) {
                    document.getElementById(`row${i}_col${j}`).className = "square"
                }
            }
        }
    }


    // function to handle the animaiation-spped
    const handleAnimationSpeedType = (type_level) => {
        const loadingToast = toast.loading("Setting ANimation Speed....")
        // cases
        if (type_level === 1) {
            ANIIMATION_SPEED_DEFAULT = SLOW
            setTimeout(() => {
                toast.dismiss(loadingToast)
                toast.success("Speed for animation is set to SLOW")
            }, 400);
        } else if (type_level === 2) {
            ANIIMATION_SPEED_DEFAULT = MEDIUM
            setTimeout(() => {
                toast.dismiss(loadingToast)
                toast.success("Speed for animation is set to MEDIUM")
            }, 400);
        } else {
            ANIIMATION_SPEED_DEFAULT = FAST
            setTimeout(() => {
                toast.dismiss(loadingToast)
                toast.success("Speed for animation is set to FAST")
            }, 400);
        }

        setAnimationType(type_level)
    }

    // function to handle the clear all maze-wall
    const makeAllCellAsWall = () => {
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                let flag = (i === START_ROW_NODE && j === START_COL_NODE) || (i === END_ROW_NODE && j === END_COL_NODE)
                if (!flag) {
                    createWall(i, j);
                }
            }
        }
    }

    // function to handle the GENERATE mazeHuddle
    const handleGenerateMaze = async () => {
        // clear all the walls and disabled all buttone swhen MAZE/HUDDLE are being generating....
        var btns = document.getElementsByClassName("btn-selector")
        document.getElementsByTagName("select")[0].disabled = true
        document.getElementsByTagName("select")[0].disabled = true
        for (let i = 0; i < btns.length; i++) {
            btns[i].disabled = true;
        }

        // generating the NEW-MAZE
        // BASED on the SELECTION[Option]
        var arr = []
        if (mazeID === 1) {
            arr = randomMazeBasic(row, col)
            await mazeGenerator(arr);
        } else if (mazeID === 2) {
            makeAllCellAsWall()
            arr = randomizedMaze_DFS(row, col)
            await mazeGenerator(arr)
        } else if (mazeID === 3) {
            arr = kruskalAlgorithm(row, col)
            await mazeGenerator(arr)
        } else if (mazeID === 4) {
            arr = primsAlgorithmMaze(row, col);
            await mazeGenerator(arr)
        } else if (mazeID === 5) { // RECURSIVE DIVISION
            arr = recurisveDivision(row, col)
            await mazeGenerator(arr)
        }


        document.getElementsByTagName("select")[0].disabled = false
        document.getElementsByTagName("select")[0].disabled = false
        for (let i = 0; i < btns.length; i++) {
            btns[i].disabled = false;
        }
    }

    // function to handle the reset-board
    const handleResetBoard = (e) => {
        const loadingToast = toast.loading("Resetting the Board....")

        START_ROW_NODE = INITIAL_ROW_START
        START_COL_NODE = INITIAL_COL_START
        END_ROW_NODE = INITIAL_ROW_END
        END_COL_NODE = INITIAL_COL_END

        setTimeout(() => {
            toast.dismiss(loadingToast)
            toast.success("Board Reset")
            handleClearPath();
            makeGridInitially()
        }, 300);
    }

    // function to generate the MAZE/HUDDLE
    const mazeGenerator = async (arr) => {
        for (var i = 0; i < arr.length; i++) {
            if ((arr[i].r === START_ROW_NODE && arr[i].c === START_COL_NODE) || (arr[i].r === END_ROW_NODE && arr[i].c === END_COL_NODE)) {
                continue;
            } else {
                await animationEffect(ANIIMATION_SPEED_DEFAULT)
                createWall(arr[i].r, arr[i].c);
            }
        }
    }

    // function to make the walls....[HUDDLES]
    const createWall = (row1, col1) => {
        // this walls making concpet is knows as array reference and copy
        var new_grid = [...grid] //array copy
        // console.log(new_grid);
        // console.log(grid);
        // console.log(row1);
        // console.log(col1);
        var node = new_grid[row1][col1]
        node.isWall = !node.isWall
        new_grid[row1][col1] = node

        setGrid(new_grid)
    }

    // function to set starting and ending of the node...
    const setStartEndNode = (id, row1, col1) => {
        if (id === 1) {
            let new_grid = [...grid]
            let PRE_START_NODE = new_grid[START_ROW_NODE][START_COL_NODE]
            let CURRENT_START_NODE = new_grid[row1][col1]

            PRE_START_NODE.isStart = !PRE_START_NODE.isStart
            CURRENT_START_NODE.isStart = !CURRENT_START_NODE.isStart

            setGrid(new_grid)

            START_ROW_NODE = row1
            START_COL_NODE = col1
        } else {
            let new_grid = [...grid]
            let PRE_END_NODE = new_grid[END_ROW_NODE][END_COL_NODE]
            let CURRENT_END_NODE = new_grid[row1][col1]

            PRE_END_NODE.isEnd = !PRE_END_NODE.isEnd
            CURRENT_END_NODE.isEnd = !CURRENT_END_NODE.isEnd

            setGrid(new_grid)

            END_ROW_NODE = row1
            END_COL_NODE = col1
        }
    }


    // function to check the valid point or not
    const isValidElement = (row1, col1) => {
        if ((row1 === START_ROW_NODE && col1 === START_COL_NODE) || (row1 === END_ROW_NODE && col1 === END_COL_NODE)) {
            return 0;
        }
        return 1;
    }


    // SOME of the MOUSE-HANDLERS
    // 1. on-mouse-down
    const onMouseDown = (row1, col1) => {
        if (isValidElement(row1, col1)) {
            setIsMousePress(true)
            createWall(row1, col1)
        }
    }

    // 2. on-mouse-up
    const onMouseUp = () => {
        setIsMousePress(() => false);
    }

    // 3. on-mouse-enter
    const onMouseEnter = (row1, col1) => {
        if (isMousePress === true && isValidElement(row1, col1)) {
            createWall(row1, col1);
        }
    }







    return (
        <>

            <PageAnimationWrapper>

                <div className="active mb-9" id="Container-blur">
                    <Toaster />

                    <div className="path-container">
                        <div className="path-header mb-4 min-w-[775px] flex-wrap md:flex-nowrap">

                            <div className='flex items-center flex-col justify-center flex-wrap'>
                                {/* Find the Optimal Path.. */}
                                <div className="flex justify-end my-[12px] gap-3 relative mx-10">
                                    <Button
                                        className='btn-selector'
                                        label="Search Possible Path"
                                        onClick={handlePathFinder}
                                    />

                                    <select
                                        className='form-select'
                                        value={pathID}
                                        onChange={(e) => setPathID(parseInt(e.target.value))}
                                    >
                                        <option value="0" disabled className='my-drop-down-option line-clamp-1 text-ellipsis'>
                                            Select Algorithm
                                        </option>
                                        {
                                            pathFinderAlgorithm.map((algo, index) => {
                                                return (
                                                    <option
                                                        value={index + 1}
                                                        key={index}
                                                    >
                                                        {algo}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>

                                {/* Type of animations.... */}
                                {/* SLOW, FAST, MEDIUM */}
                                <div className="path-speed-btns">
                                    <div className="flex flex-row flex-wrap -m-1">
                                        <CheckBox
                                            label="Slow"
                                            onClick={() => handleAnimationSpeedType(1)}
                                            checked={animationType == 1}
                                        />
                                        <CheckBox
                                            label="Medium"
                                            onClick={() => handleAnimationSpeedType(2)}
                                            checked={animationType == 2}
                                        />
                                        <CheckBox
                                            label="Fast"
                                            onClick={() => handleAnimationSpeedType(3)}
                                            checked={animationType == 3}
                                        />
                                    </div>
                                </div>
                            </div>


                            <div className='maze_options'>
                                <div className="flex justify-end my-[12px] gap-3 mx-5 lg:mx-0 flex-wrap md:flex-nowrap">
                                    <select
                                        className='form-select'
                                        value={mazeID}
                                        onChange={(e) => setMazeID(parseInt(e.target.value))}
                                    >
                                        <option value="0" disabled className='my-drop-down-option line-clamp-1 text-ellipsis'>
                                            Select Maze Type (Huddles)
                                        </option>
                                        {
                                            huddlesTypes.map((sm, index) => {
                                                return (
                                                    <option
                                                        key={index + 100}
                                                        value={index + 1}
                                                    >
                                                        {sm}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>

                                    <Button
                                        onClick={handleGenerateMaze}
                                        label="Generate Maze"
                                        isBgColor
                                        className="btn-selector END-maze-btn"
                                    />
                                </div>

                                {/* Some Usefully BUTTONS... */}
                                <div className="flex gap-3 mx-5 lg:mx-0 flex-wrap md:flex-nowrap">
                                    <Button
                                        className="btn-selector"
                                        onClick={makeGridInitially}
                                        label="Clear Huddles-Walls"
                                    />
                                    <Button
                                        className='btn-selector'
                                        label="Clear Path"
                                        onClick={handleClearPath}
                                    />

                                    {/* BOARD RESET */}
                                    <Button
                                        className="btn-selector !border-red-400 !text-red-400 hover:!bg-red-400 hover:!text-white"
                                        onClick={handleResetBoard}
                                        label="Reset Board"
                                    />
                                </div>

                            </div>

                        </div>



                        {/* Rendering of the GRID-BOXES */}
                        <div className="grid">

                            <div
                                onMouseLeave={() => setIsMousePress(false)}
                            >
                                {
                                    grid.map((rw, row_idx) => {
                                        // console.log(rw);
                                        return (
                                            <div
                                                className='ROW'
                                                key={row_idx}
                                            >
                                                {
                                                    rw.map((val, col_idx) => {
                                                        const { x, y, isStart, isEnd, isWall } = val
                                                        // console.log({x, y, isStart, isEnd, isWall})
                                                        return (
                                                            <Node
                                                                key={col_idx}
                                                                p_values={{ x, y, isStart, isEnd, isWall, onMouseDown, onMouseEnter, onMouseUp, setStartEndNode }}
                                                            >
                                                            </Node>
                                                        )
                                                    })
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>

                </div>

            </PageAnimationWrapper>
        </>
    )
}

export default PathFindingVisualizer
