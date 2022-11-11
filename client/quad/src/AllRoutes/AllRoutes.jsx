
import React from 'react'
import { Routes, Route } from "react-router-dom"
import Footer from '../Components/Footer'
import AllRestaurants from '../Pages/AllRestaurants'
import Home from '../Pages/Home'


const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path={"/"} element={<Home/>}></Route>
            <Route path={"/allrestaurants"} element={<AllRestaurants/>}></Route>
        </Routes>
        <Footer/>
    </div>
  )
}

export default AllRoutes