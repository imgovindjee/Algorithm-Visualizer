import React from 'react'

import { Route, Routes, useLocation } from 'react-router'


import Home from './pages/Home/Home'
import Sorting from './pages/Sorting/Sorting'
import NQueen from './pages/NQueen/NQueen'
import NavBar from './components/NavBar/NavBar'
import PathFindingVisualizer from './pages/PathFindingVisualizer/PathFindingVisualizer'
import AboutDeveloper from './pages/AboutDeveloper/AboutDeveloper'



const App = () => {

  const location = useLocation()
  const _messgae = location.pathname.split("/")[1];
  // console.log(location.pathname.split("/")[1] ? 1:0);

  return (
    <div className='w-full h-full'>

      <Routes>

        <Route path='/' element={<NavBar message={_messgae ? _messgae : "Algorithm Visualizer"} />}>

          <Route path='/' element={<Home />} />
          <Route path='/path-visualizer' element={<PathFindingVisualizer />} />
          <Route path='/sorting' element={<Sorting />} />
          <Route path='/nqueen' element={<NQueen />} />

          <Route path='about-developer' element={<AboutDeveloper />} />

        </Route>

      </Routes>

    </div>
  )
}

export default App
