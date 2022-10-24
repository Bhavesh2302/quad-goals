
import React from 'react'
import { Routes, Route } from "react-router-dom"
import Footer from '../Components/Footer'
import Home from '../Pages/Home'


const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path={"/"} element={<Home/>}></Route>
        </Routes>
        <Footer/>
    </div>
  )
}

export default AllRoutes