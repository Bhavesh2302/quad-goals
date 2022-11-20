import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { singleRestaurant } from '../Redux/Reducers/RestaurantReducer/action';

const SingleRestaurant = () => {

     const dispatch  =useDispatch()
     const [singleRestaurantData, setSingleRestaurantData] = useState([])
    const {restId} =useParams()
    console.log(restId)

    let token = JSON.parse(localStorage.getItem("rest_token"));
     console.log(token)

  useEffect(()=>{
dispatch(singleRestaurant(restId))
.then((res)=>{
    if(res.type="GET_MENU_DATA_SUCCESS"){
        // console.log(res.payload)
        let data = res.payload.menuList
        console.log(data)

        setSingleRestaurantData(data)
// console.log("hello")
    }
})


},[])
console.log(singleRestaurantData)

  return (
    <div>SingleRestaurant</div>
  )
}

export default SingleRestaurant
