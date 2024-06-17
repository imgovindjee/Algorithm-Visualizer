import React, { useEffect, useState } from 'react'

import Button from '../../components/Button/Button'

import mergesort from '../../Algorithms/SortingAlgorithms/MergeSort'
import bubblesort from '../../Algorithms/SortingAlgorithms/BubbleSort'
import insertionsort from '../../Algorithms/SortingAlgorithms/InsertionSort'
import selectionsort from '../../Algorithms/SortingAlgorithms/SelectionSort'
import { heapsort } from '../../Algorithms/SortingAlgorithms/HeapSort'
import countsort from '../../Algorithms/SortingAlgorithms/CountSort'
import radixsort from '../../Algorithms/SortingAlgorithms/RadixSort'
import quicksort from '../../Algorithms/SortingAlgorithms/QuickSort'
import PageAnimationWrapper from '../../common/PageAnimationWrapper/PageAnimationWrapper'

import "./Sorting.scss"


var SPEED = 500
var BARS = 100
const barWidth = 10
const sortingMethods = [
    "Bubble Sort",
    "Count Sort",
    "Heap Sort",
    "Insertion Sort",
    "Merge Sort",
    "Radix Sort",
    "Selection Sort",
    "Quick Sort"
]
const numOfBars = [25, 50, 75, 100, 150, 200, 250, 300]




const Sorting = () => {

    // hooks
    // to set and update the bars-counts
    const [bar, setBar] = useState([80, 40, 20, 70, 30]);

    // to handle and toggle the spped of sorting
    const [speed, setSpeed] = useState(SPEED);

    // setting the new-Id to each of the different sorting types
    const [sortId, setSortId] = useState(0)

    // function to make the "BRAS" to be sorted
    const makeRandomBars = () => {
        var arr = [];
        for (var i = 0; i < BARS; i++) {
            let temp = Math.floor(Math.random() * 1000) % 400;
            arr.push(temp)
        }
        setBar(arr);
    }

    useEffect(() => {
        makeRandomBars()
    }, [])


    // fnction to handle the sorting-type-change
    // whinch sorting need to be perform
    const handleSortingTypeChange = (e) => {
        var value = e.target.value;

        // setting up the value to setId
        setSortId(parseInt(value));
        generateNewArray();
    }


    // function to handle the Speed change
    const handleSpeedChange = (e) => {
        SPEED = parseInt(e.target.max) - parseInt(e.target.value)
        setSpeed(e.target.valueAsNumber)
    }


    // function to handle th barSize
    const handleBarSize = (e) => {
        BARS = parseInt(e.target.value)
        generateNewArray();
    }


    // function to handle the New Array Generation
    var ORGINAL_COLOR = "#3498DB";
    const generateNewArray = () => {
        var arr = [];
        for (let i = 0; i < BARS; i++) {
            let temp = Math.floor(Math.random() * 1000) % 400;
            arr.push(temp);
        }

        for (let i = 0; i < bar.length; i++) {
            var _bar = document.getElementById(`bar-${i}`)
            _bar.style.backgroundColor = ORGINAL_COLOR
        }
        setBar(arr);
    }



    // SORTING VISULALIZER....
    var COMP_COLOR = "#FF5959";
    var SORTED_COLOR = "#6C3483";
    var PIVOT_COLOR = "orange";

    // 1. MERGE SORT
    const mergeSort = () => {
        const animations = mergesort(bar)

        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('bar')
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i]
                const barOneStyle = arrayBars[barOneIdx].style
                const barTwoStyle = arrayBars[barTwoIdx].style
                const color = i % 3 !== 0 ? COMP_COLOR : SORTED_COLOR
                setTimeout(() => {
                    barOneStyle.backgroundColor = color
                    barTwoStyle.backgroundColor = color
                }, SPEED * i);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i]
                    const barOneStyle = arrayBars[barOneIdx].style
                    barOneStyle.height = `${newHeight}px`
                }, SPEED * i)
            }
        }
    }

    // 2. BUBBLE SORT
    const bubbleSort = () => {
        const animations = bubblesort(bar);

        for (let i = 0; i < animations.length; i++) {
            const isColoredChanged = animations[i][0] === "comparision1" || animations[i][0] === "comparision2"
            const arrayBars = document.getElementsByClassName("bar")
            if (isColoredChanged) {
                const color = animations[i][0] === 'comparision1' ? SORTED_COLOR : COMP_COLOR
                const [, barOneIdx, barTwoIdx] = animations[i]
                const barOneStyle = arrayBars[barOneIdx].style
                const barTwoStyle = arrayBars[barTwoIdx].style
                setTimeout(() => {
                    barOneStyle.backgroundColor = color
                    barTwoStyle.backgroundColor = color
                }, i * SPEED);
            } else {
                const [, barOneIdx, newHeight] = animations[i]
                if (barOneIdx === -1) {
                    continue
                }

                const barOneStyle = arrayBars[barOneIdx].style
                setTimeout(() => {
                    barOneStyle.height = `${newHeight}px`
                }, i * SPEED);
            }
        }
    }

    // 3. INSERTION SORT
    const insertionSort = () => {
        const animations = insertionsort(bar)

        for (let i = 0; i < animations.length; i++) {
            const isColorChange = animations[i][0] === "comparison1" || animations[i][0] === "comparison2";
            const arrayBars = document.getElementsByClassName("bar");
            if (isColorChange) {
                const color = animations[i][0] === "comparison1" ? SORTED_COLOR : COMP_COLOR;
                const [, barOneIndex, barTwoIndex] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * SPEED);
            } else {
                const [, barIndex, newHeight] = animations[i];
                const barStyle = arrayBars[barIndex].style;
                setTimeout(() => {
                    barStyle.height = `${newHeight}px`;
                }, i * SPEED);
            }
        }
    }

    // 4. HEAP SORT
    const heapSort = () => {
        const animations = heapsort(bar)

        for (let i = 0; i < animations.length; i++) {
            const isColorChanged = animations[i][0] === "comparision1" || animations[i][0] === "comparision2"
            const arrayBars = document.getElementsByClassName("bar")
            if (isColorChanged) {
                const color = animations[i][0] === "comparision1" ? SORTED_COLOR : COMP_COLOR
                const [, barOneIdx, barTwoIdx] = animations[i]
                const barOneStyle = arrayBars[barOneIdx].style
                const barTwoStyle = arrayBars[barTwoIdx].style
                setTimeout(() => {
                    barOneStyle.backgroundColor = color
                    barTwoStyle.backgroundColor = color
                }, i * SPEED);
            } else {
                const [, barOneIdx, newHeight] = animations[i]
                if (barOneIdx == -1) {
                    continue
                }

                const barOneStyle = arrayBars[barOneIdx].style
                setTimeout(() => {
                    barOneStyle.height = `${newHeight}px`
                }, i * SPEED);
            }
        }
    }

    // 5. COUNT SORT
    const countSort = () => {
        const animations = countsort(bar)

        for (let i = 0; i < animations.length; i++) {
            const isColorChanged = animations[i][0] === "comparision1" || animations[i][0] === "comparision2";
            const arrayBars = document.getElementsByClassName('bar');
            if (isColorChanged) {
                const color = (animations[i][0] === "comparision1") ? SORTED_COLOR : COMP_COLOR;
                const [, barOneIndex] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                }, i * SPEED);
            } else {
                const [, barOneIdx, newHeight] = animations[i];
                if (barOneIdx === -1) {
                    continue;
                }
                const barOneStyle = arrayBars[barOneIdx].style;
                setTimeout(() => {
                    barOneStyle.height = `${newHeight}px`;
                }, i * SPEED);
            }
        }
    }

    // 6. RADIX SORT
    const radixSort = () => {
        const animations = radixsort(bar)

        for (let i = 0; i < animations.length; i++) {
            const isColorChanged = animations[i][0] === "comparision1" || animations[i][0] === "comparision2";
            const arrayBars = document.getElementsByClassName('bar');
            if (isColorChanged) {
                const color = (animations[i][0] === "comparision1") ? SORTED_COLOR : COMP_COLOR;
                const [, barOneIndex] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                }, i * SPEED);
            } else {
                const [, barOneIdx, newHeight] = animations[i];
                if (barOneIdx === -1) {
                    continue;
                }
                const barOneStyle = arrayBars[barOneIdx].style;
                setTimeout(() => {
                    barOneStyle.height = `${newHeight}px`;
                }, i * SPEED);
            }
        }
    }

    // 7.SELECTION SORT
    const selectionSort = () => {
        const animations = selectionsort(bar)

        for (let i = 0; i < animations.length; i++) {
            const isColoredChanged = animations[i][0] === "comparision1" || animations[i][0] === "comparision2"
            const arrayBars = document.getElementsByClassName("bar")
            if (isColoredChanged) {
                const color = animations[i][0] === "comparision1" ? SORTED_COLOR : COMP_COLOR
                const [, barOneIdx, barTwoIdx] = animations[i]
                const barOneStyle = arrayBars[barOneIdx].style
                const barTwoStyle = arrayBars[barTwoIdx].style
                setTimeout(() => {
                    barOneStyle.backgroundColor = color
                    barTwoStyle.backgroundColor = color
                }, i * SPEED);
            } else {
                const [, barOneIdx, newHeight] = animations[i]
                if (barOneIdx === -1) {
                    continue;
                }

                const barOneStyle = arrayBars[barOneIdx].style
                setTimeout(() => {
                    barOneStyle.height = `${newHeight}px`
                }, i * SPEED);
            }
        }
    }

    // 8. QUICK SORT
    const quickSort = () => {
        const animations = quicksort(bar)

        for (let i = 0; i < animations.length; i++) {
            const isColorChanged = animations[i][0] === "comparision1" || animations[i][0] === "comparision2";
            const arrayBars = document.getElementsByClassName("bar");

            if (isColorChanged) {
                const color = animations[i][0] === "comparision1" ? SORTED_COLOR : COMP_COLOR;

                const [, barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * SPEED);
            } else {
                const [, barOneIdx, newHeight] = animations[i];
                if (barOneIdx === -1) {
                    continue;
                }
                const barOneStyle = arrayBars[barOneIdx].style;
                setTimeout(() => {
                    barOneStyle.height = `${newHeight}px`;
                }, i * SPEED);
            }
        }
    }


    // function to handle the sorting 
    const startHandleSorting = async () => {
        document.getElementsByTagName("button")[0].disabled = true
        document.getElementsByTagName("button")[1].disabled = true
        document.getElementsByTagName("select")[0].disabled = true
        document.getElementsByTagName("select")[1].disabled = true

        if (sortId === 0) {
            await bubbleSort();
        } else if (sortId === 1) {
            await countSort();
        } else if (sortId === 2) {
            await heapSort();
        } else if (sortId === 3) {
            await insertionSort();
        } else if (sortId === 4) {
            await mergeSort();
        } else if (sortId === 5) {
            await radixSort();
        } else if (sortId === 6) {
            await selectionSort();
        } else if (sortId === 7) {
            await quickSort();
        }

        document.getElementsByTagName("button")[0].disabled = false
        document.getElementsByTagName("button")[1].disabled = false
        document.getElementsByTagName("select")[0].disabled = false
        document.getElementsByTagName("select")[1].disabled = false
    }






    // MAIN BODY
    return (
        <>

            <PageAnimationWrapper>

                <div id='container__blur' className=' container__blur active'>

                    <div className='sorting__container'>

                        <div className='Btn-Wrap'>

                            <div className='flex gap-3'>
                                {/* sorting-start... */}
                                <Button
                                    label="Start Sorting"
                                    isBgColor
                                    onClick={startHandleSorting}
                                />

                                {/* new array generate... */}
                                <Button
                                    label="Generate New Array"
                                    onClick={generateNewArray}
                                />

                                {/* Type of Sorting too be Performed... */}
                                <select
                                    id='num1'
                                    name='num1'
                                    className="form-select"
                                    value={sortId}
                                    onChange={handleSortingTypeChange}
                                >
                                    {
                                        sortingMethods.map((sm, index) => {
                                            return (
                                                <option value={index} key={index}>
                                                    {sm}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div className='flex items-center gap-3 md:items-center md:justify-center text-black'>
                                {/* speed of the sorting */}
                                <div className='st-speed-range mx-3'>
                                    <div className='st-speed-range-lavel'>
                                        <label
                                            htmlFor="range1"
                                            className='sorting-label text-center font-medium'
                                        >
                                            Speed:{" "}&nbsp;
                                        </label>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <input
                                            type="range"
                                            name='range1'
                                            id='range1'
                                            value={speed}
                                            min="1"
                                            max="1000"
                                            step="1"
                                            onChange={handleSpeedChange}
                                            className='h-1'
                                        />
                                    </div>
                                </div>


                                {/* this is equivalent to number of element in the array for the sorting.. */}
                                <div className='mx-3'>
                                    <label htmlFor="num" className='font-medium'>
                                        No. of Bars:&nbsp;
                                    </label>

                                    <select
                                        className='form-select'
                                        value={bar.length}
                                        onChange={handleBarSize}
                                        name="num"
                                        id="num"
                                    >
                                        {
                                            numOfBars.map((nb, index) => {
                                                return (
                                                    <option key={index} value={nb}>
                                                        {nb}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>




                        {/* Bars for Sorting */}
                        <div className='wrapperBar border border-gray-300 p-3'>
                            {
                                bar.map((arrayBar, index) => {
                                    return (
                                        <div
                                            className='bar'
                                            id={`bar-${index}`}
                                            key={index}
                                            style={{ width: barWidth, height: arrayBar }}
                                        >
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>

            </PageAnimationWrapper>

        </>
    )
}

export default Sorting
