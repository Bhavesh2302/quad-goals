
import React from 'react'
import { Routes, Route } from "react-router-dom"
import Footer from '../Components/Footer'
import AllRestaurants from '../Pages/AllRestaurants'
import Home from '../Pages/Home'
import RestOwnerSignup from '../Pages/RestOwnerSignup'


const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path={"/"} element={<Home/>}></Route>
            <Route path={"/allrestaurants/:city"} element={<AllRestaurants/>}></Route>
            <Route path={"/restownersignup"} element={<RestOwnerSignup/>}></Route>
        </Routes>
        <Footer/>
    </div>
  )
}

export default AllRoutes