import { Box, Image, Text } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import { singleRestaurant, singleRestaurantName } from '../Redux/Reducers/RestaurantReducer/action';
import { FaStar } from "react-icons/fa";

const SingleRestaurant = () => {

     const dispatch  =useDispatch()
     const [menu , setMenu] = useState([])
     const [singleRestaurantData, setSingleRestaurantData] = useState({})
    //  const 
    const {restId} =useParams()
    console.log(restId)

  

  useEffect(()=>{
dispatch(singleRestaurant(restId))
.then((res)=>{
    if(res.type="GET_MENU_DATA_SUCCESS"){
        // console.log(res.payload)
        let data = res.payload.menuList
        console.log(data)

        setMenu(data)

    }
})

dispatch(singleRestaurantName(restId))
.then((res)=>{
  if(res.type="GET_SINGLE_RESTAURANT_NAME_SUCCESS"){
 let data = res.payload.singleRestaurant

 setSingleRestaurantData(data)
  }
})


},[])
console.log(menu)
console.log(singleRestaurantData)

const cuisine = singleRestaurantData?.cuisines?.join(", ")

  return (
   <Box>
    <Navbar/>

    <Box bg="#171a29">
      <Box display={"flex"} gap="80px" p="50px 30px" color="white" w="80%" m="auto">
        <Box w="30%">
          <Image src={singleRestaurantData.image_rest} height="190px"/>
        </Box>
        <Box w="60%">
          <Text fontSize={"32px"} fontWeight="400" textAlign={"left"}>{singleRestaurantData.rest_name}</Text>
          
                <Text  color={"#b1b2b7"} fontSize="15px" mt="10px" textAlign="left" height="20px" w="80%">{cuisine}</Text>
         
          <Text color={"#b1b2b7"} fontSize="15px" mt="10px" textAlign={"left"}> {singleRestaurantData.address}</Text>
         <Box display={"flex"} mt="20px" gap="50px" textAlign="left" alignItems={"left"} pt="15px" w="100%">
          
       <Box >
          <Box
                  display={"flex"}
                  justifyContent={"space-evenly"}
                  gap="5px"
                  fontWeight={"600"}
                  p="0px 5px"
                  fontSize={"16px"}
                  alignItems={"center"}
                  color="white"
                >
                  <Box>
                    <FaStar fontSize={"12px"} />
                  </Box>
                  <Box>
                    <Text>{singleRestaurantData.rating}</Text>
                  </Box>
                </Box>

                <Text color={"#b1b2b7"} fontSize="12px" mt="2px">Ratings</Text>

                </Box>

                <Box borderLeft="1px solid #b1b2b7" height="40px">

                </Box>

                <Box>
                 <Text fontWeight={"600"}
                  fontSize={"16px"}>{`${singleRestaurantData.d_time} MINS`}</Text>

<Text color={"#b1b2b7"} fontSize="12px" mt="2px">Delivery Time</Text>
                </Box>
                <Box borderLeft="1px solid #b1b2b7" height="40px">

                </Box>

                <Box>
                  <Text>{`₹${singleRestaurantData.cost}`}</Text>
                  <Text color={"#b1b2b7"} fontSize="12px" mt="2px">Cost for two</Text>
                </Box>

         </Box>
        </Box>
        <Box></Box>

      </Box>

    </Box>
   </Box>
  )
}

export default SingleRestaurant
