import React, { useEffect, useState } from 'react'

import Button from '../../components/Button/Button'

import PageAnimationWrapper from '../../common/PageAnimationWrapper/PageAnimationWrapper'

import "./NQueen.scss"


var SPEED = 600


const NQueen = () => {

    // hooks
    // to manage the grid
    const [grid, setGrid] = useState([])

    // to make the no. of grid
    const [gridSize, setGridSize] = useState(4)

    // manges the speed
    const [speed, setSpeed] = useState(SPEED)

    // function to mkae the grid
    const makeGridBox = () => {
        grid.forEach((row, i) => {
            row.forEach((r, j) => {
                if ((i + j) % 2 === 0) {
                    document.getElementById(`cell-${i}-${j}`).classList = "queen-cell grey-cell"
                } else {
                    document.getElementById(`cell-${i}-${j}`).classList = "queen-cell"
                }
            })
        })

        let _grid = new Array(gridSize)
        for (let i = 0; i < gridSize; i++) {
            _grid[i] = new Array(gridSize).fill(false)
        }
        setGrid(_grid);
    }


    // REAL TIME RENDERING OF THE GRID-BOX
    useEffect(() => {
        makeGridBox();
    }, [gridSize])


    // function to start the N-Queen solve
    const handleVisualizer = async (e) => {
        await n_queen(0, 0);
    }

    // fnction to handle the visulization speed
    const handleVisualizingSpeed = (e) => {
        let val = parseInt(e.target.value)
        SPEED = val
        setSpeed(val)
    }

    // function to handle the grid-size-change
    const handleGridSizeChange = (e) => {
        setGridSize(parseInt(e.target.value));
    }


    // ANIIMATION.....
    // VISUAL TREAT
    async function waitForAnimation(speed_of_delay) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("");
            }, speed_of_delay);
        })
    }



    // ALGORITHM SOLVER
    // N-QUEEN SOLVER

    // determining the "current-position" is safe or not
    var isSafe = async (r, c) => {
        var flag = 1;

        // row-wise check
        for (let j = 0; j < c; j++) {
            if (grid[r][j]) {
                flag = 0;
                document.getElementById(`cell-${r}-${j}`).classList = 'queen-cell queen-img red-cell'
            } else {
                document.getElementById(`cell-${r}-${j}`).classList = 'queen-cell blue-cell'
            }
        }
        for (let j = c + 1; j < gridSize; j++) {
            if (grid[r][j]) {
                flag = 0;
                document.getElementById(`cell-${r}-${j}`).classList = 'queen-cell queen-img red-cell'
            } else {
                document.getElementById(`cell-${r}-${j}`).classList = 'queen-cell blue-cell'
            }
        }


        // column-wise check
        for (let i = 0; i < r; i++) {
            if (grid[i][c]) {
                flag = 0;
                document.getElementById(`cell-${i}-${c}`).classList = 'queen-cell queen-img red-cell'
            } else {
                document.getElementById(`cell-${i}-${c}`).classList = 'queen-cell blue-cell'
            }
        }
        for (let i = r + 1; i < gridSize; i++) {
            if (grid[i][c]) {
                flag = 0;
                document.getElementById(`cell-${i}-${c}`).classList = 'queen-cell queen-img red-cell'
            } else {
                document.getElementById(`cell-${i}-${c}`).classList = 'queen-cell blue-cell'
            }
        }



        // right-diagonal check
        for (let i = r + 1, j = c + 1; i < gridSize && j < gridSize; i++, j++) {
            if (grid[i][j]) {
                flag = 0;
                document.getElementById(`cell-${i}-${j}`).classList = 'queen-cell queen-img red-cell'
            } else {
                document.getElementById(`cell-${i}-${j}`).classList = 'queen-cell blue-cell'
            }
        }
        for (let i = r - 1, j = c - 1; i >= 0 && j >= 0; i--, j--) {
            if (grid[i][j]) {
                flag = 0;
                document.getElementById(`cell-${i}-${j}`).classList = 'queen-cell queen-img red-cell'
            } else {
                document.getElementById(`cell-${i}-${j}`).classList = 'queen-cell blue-cell'
            }
        }


        // left-diagonal check
        for (let i = r + 1, j = c - 1; i < gridSize && j >= 0; i++, j--) {
            if (grid[i][j]) {
                flag = 0;
                document.getElementById(`cell-${i}-${j}`).classList = 'queen-cell queen-img red-cell'
            } else {
                document.getElementById(`cell-${i}-${j}`).classList = 'queen-cell blue-cell'
            }
        }
        for (let i = r - 1, j = c + 1; i >= 0 && j < gridSize; i--, j++) {
            if (grid[i][j]) {
                flag = 0;
                document.getElementById(`cell-${i}-${j}`).classList = 'queen-cell queen-img red-cell'
            } else {
                document.getElementById(`cell-${i}-${j}`).classList = 'queen-cell blue-cell'
            }
        }

        await waitForAnimation(SPEED);

        // <----------------UNDO-------------------->

        // row-wise check
        for (let j = 0; j < c; j++) {
            if (grid[r][j]) {
                document.getElementById(`cell-${r}-${j}`).classList = "queen-cell queen-img green-cell";
            } else if ((r + j) % 2 === 0) {
                document.getElementById(`cell-${r}-${j}`).classList = "queen-cell grey-cell";
            } else {
                document.getElementById(`cell-${r}-${j}`).classList = "queen-cell";
            }
        }
        for (let j = c + 1; j < gridSize; j++) {
            if (grid[r][j]) {
                document.getElementById(`cell-${r}-${j}`).classList = "queen-cell queen-img green-cell";
            } else if ((r + j) % 2 === 0) {
                document.getElementById(`cell-${r}-${j}`).classList = "queen-cell grey-cell";
            } else {
                document.getElementById(`cell-${r}-${j}`).classList = "queen-cell";
            }
        }

        // column-wise check
        for (let i = 0; i < r; i++) {
            if (grid[i][c]) {
                document.getElementById(`cell-${i}-${c}`).classList = "queen-cell queen-img green-cell";
            } else if ((i + c) % 2 === 0) {
                document.getElementById(`cell-${i}-${c}`).classList = "queen-cell grey-cell";
            } else {
                document.getElementById(`cell-${i}-${c}`).classList = "queen-cell";
            }
        }
        for (let i = r + 1; i < gridSize; i++) {
            if (grid[i][c]) {
                document.getElementById(`cell-${i}-${c}`).classList = "queen-cell queen-img green-cell";
            } else if ((i + c) % 2 === 0) {
                document.getElementById(`cell-${i}-${c}`).classList = "queen-cell grey-cell";
            } else {
                document.getElementById(`cell-${i}-${c}`).classList = "queen-cell";
            }
        }


        // right-diagonal check
        for (let i = r + 1, j = c + 1; i < gridSize && j < gridSize; i++, j++) {
            if (grid[i][j]) {
                document.getElementById(`cell-${i}-${j}`).classList = "queen-cell queen-img green-cell";
            } else if ((i + j) % 2 === 0) {
                document.getElementById(`cell-${i}-${j}`).classList = "queen-cell grey-cell";
            } else {
                document.getElementById(`cell-${i}-${j}`).classList = "queen-cell";
            }
        }
        for (let i = r - 1, j = c - 1; i >= 0 && j >= 0; i--, j--) {
            if (grid[i][j]) {
                document.getElementById(`cell-${i}-${j}`).classList = "queen-cell queen-img green-cell";
            } else if ((i + j) % 2 === 0) {
                document.getElementById(`cell-${i}-${j}`).classList = "queen-cell grey-cell";
            } else {
                document.getElementById(`cell-${i}-${j}`).classList = "queen-cell";
            }
        }


        // left-diagonal check
        for (let i = r + 1, j = c - 1; i < gridSize && j >= 0; i++, j--) {
            if (grid[i][j]) {
                document.getElementById(`cell-${i}-${j}`).classList = "queen-cell queen-img green-cell";
            } else if ((i + j) % 2 === 0) {
                document.getElementById(`cell-${i}-${j}`).classList = "queen-cell grey-cell";
            } else {
                document.getElementById(`cell-${i}-${j}`).classList = "queen-cell";
            }
        }
        for (let i = r - 1, j = c + 1; i >= 0 && j < gridSize; i--, j++) {
            if (grid[i][j]) {
                document.getElementById(`cell-${i}-${j}`).classList = "queen-cell queen-img green-cell";
            } else if ((i + j) % 2 === 0) {
                document.getElementById(`cell-${i}-${j}`).classList = "queen-cell grey-cell";
            } else {
                document.getElementById(`cell-${i}-${j}`).classList = "queen-cell";
            }
        }

        return flag;
    }

    // DRIVE FUNCTION
    var n_queen = async (c, q) => {
        if (c >= gridSize || q >= gridSize) {
            return q >= gridSize;
        }

        for (var r = 0; r < gridSize; r++) {
            document.getElementById(`cell-${r}-${c}`).classList = 'queen-cell queen-img yellow-cell';
            await waitForAnimation(SPEED);

            if (await isSafe(r, c)) {
                document.getElementById(`cell-${r}-${c}`).classList = "queen-cell queen-img green-cell";
                grid[r][c] = true;
                if (await n_queen(c + 1, q + 1)) {
                    return true;
                }

                // backtrack
                grid[r][c] = false;
                if ((r + c) % 2 === 0) {
                    document.getElementById(`cell-${r}-${c}`).classList = "queen-cell grey-cell";
                } else {
                    document.getElementById(`cell-${r}-${c}`).classList = 'queen-cell';
                }
            } else if ((r + c) % 2 === 0) {
                document.getElementById(`cell-${r}-${c}`).classList = "queen-cell grey-cell";
            } else {
                document.getElementById(`cell-${r}-${c}`).classList = "queen-cell";
            }
        }
        return false;
    }








    return (
        <>
            <PageAnimationWrapper>

                <div className="queen-container">

                    <div className="queen-header">
                        <div>
                            <div className="flex gap-3">
                                <Button
                                    label="Start Visualization"
                                    isBgColor
                                    onClick={handleVisualizer}
                                />
                                <Button
                                    onClick={() => makeGridBox()}
                                    label="Clear Board"
                                />
                            </div>
                        </div>

                        <div className='px-5'>
                            {/* MAKING THE CHAGES IN THE SPEED */}
                            <div className="queen-range">
                                <div className="queenlabel font-semibold">
                                    Speed:&nbsp;
                                </div>
                                <div>
                                    <input
                                        type="range"
                                        min="120"
                                        max="1200"
                                        id='speedRange'
                                        value={SPEED}
                                        onChange={handleVisualizingSpeed}
                                        className='h-1'
                                    />
                                </div>
                            </div>

                            {/* making the VARIABLE-SIZE of the grid */}
                            <div className="queen-range">
                                <div className="queenlabel font-semibold">
                                    Board Size:&nbsp;
                                </div>
                                <div>
                                    <input
                                        type="range"
                                        value={gridSize}
                                        min="3"
                                        max="9"
                                        id='gridSizeRange'
                                        onChange={handleGridSizeChange}
                                        className='h-1'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* GRID-BOX */}
                    <div className='main-body mx-4'>
                        {
                            grid.map((row, i) => {
                                return (
                                    <div className="queen-row" key={i}>
                                        {
                                            row.map((r, j) => {
                                                if ((i + j) % 2 === 0) {
                                                    return (
                                                        <div
                                                            id={`cell-${i}-${j}`}
                                                            key={j}
                                                            className="queen-cell grey-cell"
                                                        >
                                                        </div>
                                                    )
                                                } else {
                                                    return (
                                                        <div
                                                            className="queen-cell"
                                                            key={j}
                                                            id={`cell-${i}-${j}`}
                                                        >
                                                        </div>
                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
            </PageAnimationWrapper>
        </>
    )
}

export default NQueen
