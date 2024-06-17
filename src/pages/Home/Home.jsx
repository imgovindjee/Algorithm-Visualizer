import React from 'react'

import { Link } from 'react-router-dom'

import './Home.scss'

// import NavBar from '../../components/NavBar/NavBar'
import HomeCard from '../../components/HomeCard/HomeCard'
import PageAnimationWrapper from '../../common/PageAnimationWrapper/PageAnimationWrapper'

import pfvImg from "../../assets/Images/pfv.png"
import nqImg from "../../assets/Images/nq.png"
import sortingImg from "../../assets/Images/sorting.png"




const Home = () => {

    const about_algo1 = "A sorting visualizer is a tool that allows you to observe and understand the behavior of various sorting algorithms as they sort a list of elements. It provides a visual representation of the algorithm's steps, making it easier to grasp the underlying concepts and compare the efficiency of different algorithms."
    const about_algo2 = "A N Queen Visualizer is a tool that allows you to observe and understand the behavior of the N Queen problem, which is a classic computer science puzzle that involves placing N queens on an NxN chessboard such that no two queens threaten each other. The visualizer provides a graphical representation of the board and highlights the valid and invalid placements of the queens, making it easier to grasp the underlying concepts and strategies for solving the problem."
    const about_algo3 = "A Pathfinding Visualizer is a tool that allows you to observe and understand the behavior of various pathfinding algorithms, such as Dijkstra's, Depth-First Search, and Breadth-First Search, as they navigate through a graph or maze, providing a visual representation of the algorithm's steps and highlighting the shortest path found."

    return (

        <>

            <PageAnimationWrapper>

                <section className="mycontainer">
                    {/* NavBar */}
                    {/* <NavBar message={"Algorithm Visualizer"}/> */}

                    {/* BODY */}
                    <h2 className='text-3xl text-center pt-8 pr-8 mb-4 font-semibold text-teal-500'>
                        Better Visualization of Different Algorithm
                    </h2>



                    {/* display of different cards.. */}
                    <div className='cards_container mt-10'>
                        <Link to={'/sorting'} className='mt-6 md:mt-0'>
                            <HomeCard image={sortingImg} name={"Sorting"} index={0} about_algo={about_algo1} />
                        </Link>

                        <Link to={'/path-visualizer'}>
                            <HomeCard image={pfvImg} name={"Path Visualizer"} index={1}  about_algo={about_algo3}/>
                        </Link>

                        <Link to={'/nqueen'}>
                            <HomeCard image={nqImg} name={"N Queen"} index={1} about_algo={about_algo2}/>
                        </Link>
                    </div>

                </section>


            </PageAnimationWrapper>
        </>
    )
}

export default Home
