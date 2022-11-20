import { Box, Image, Flex, Button, Text, Input, SlideFade, useDisclosure} from '@chakra-ui/react'
import React from 'react'
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import  {Link, useNavigate} from "react-router-dom"
import BannerAppStore from '../Components/BannerAppStore';
import OrderDeliveryTrackingComponent from '../Components/OrderDeliveryTrackingComponent';
import { getRestaurantsByCity } from '../Redux/Reducers/RestaurantReducer/action';
import { GET_RESTAURANTS_BY_CITY_SUCCESS } from '../Redux/Reducers/RestaurantReducer/actionTypes';
import Login from './Login';
import Signup from './Signup';

const Home = () => { 

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const strings = [ "Hungry?", "Unexpected Guest?", "Cooking gone Wrong?","Late Night at office?"]
   //let i = 0; 
   
   const [currentString, setCurrentString ] = useState("") 
   const [timer, settimer] = useState(0) 
   const timerId = useRef(null) 
   const { isOpen, onToggle } = useDisclosure();
   const [ city, setCity ] = useState("")

   useEffect(() => {

    if(!timerId.current){

        let id = setInterval(()=>{
            settimer((prev)=>prev + 1)
            setCurrentString(strings[timer])
            onToggle()
        },2000)

      timerId.current = id
     }

   
     return () => {
       clearInterval(timerId.current) 
        timerId.current=null 
        if(timer === strings.length){
          setCurrentString("Game Night?")
          //onToggle()
          settimer(0)
        }
     } 
     

   }, [timerId.current])

   const handleSearchByCity = ()=>{
  
       dispatch(getRestaurantsByCity(city))
       .then((res)=>{
        if(res.type === "GET_RESTAURANTS_BY_CITY_SUCCESS"){
          navigate(`/allrestaurants/${city}`)
        }
       })
   }

  //  useEffect(()=>{
  //   handleSearchByCity()
  //  },[])
   
  return (
    <Box w="100%">
    <Flex w={"100%"} m={"auto"} >
      <Box w={"52%"}  pl={"150px"} pt={"50px"} pr={"40px"}>
           <Flex  alignItems={"center"} justifyContent={"space-between"} p={"0px"}>
                <Box  w={"155px"} >
                    <Image objectFit={"fill"} h={"105px"} w={"100%"} borderRadius={"50%"} src={"https://i.imgur.com/Gex3smL.jpg"} alt={"Logo"}/>
                </Box>
                <Flex gap={"15px"} >
                    <Login/>
                    <Signup/>
                </Flex>
           </Flex>
           <Flex pb={"10px"} justifyContent={"flex-end"} mb={"30px"}>
               <Link to={"/restownersignup"}>
                   <Text fontWeight={"550"}>Want to be a partner? Click here</Text>
               </Link>
           </Flex>
           <Box textAlign={"left"}>
                <SlideFade  slideFade in={isOpen} offsetY='20px'>
                    <Text fontSize={"40px"} fontWeight={"bold"} mb={"12px"}>{currentString}</Text>
                </SlideFade>
                <Box fontSize={"18px"} fontWeight={"bold"} color={"gray"} >
                    <Text>Order food from favourite restaurants near you.</Text>
                </Box>
           </Box>
           <Flex mt={"23px"}>
                <Input onChange={(e)=>setCity(e.target.value)}  border={"2px solid #969491"} h={"50px"} borderRadius={"0px"} placeholder={"Enter your delivery location"}/>
                <Button onClick = {handleSearchByCity} h={"50px"}  borderRadius={"0px"} color={"white"} bg={"#ef234b "}>Find Food</Button>
           </Flex>
           <Box textAlign={"left"} mt={"20px"} mb={"20px"}>
             <Text fontSize={"16px"} color={"gray"} fontWeight={"500"} mb={"12px"}>Popular cities in India</Text>
             <Flex gap={"10px"} fontSize={"15px"} fontWeight={"500"} flexWrap={"wrap"}>
                 <Text color={"#bdb3b6"}>Mumbai</Text>
                 <Text color={"#969491"}>Delhi</Text>
                 <Text color={"#bdb3b6"}>Gurgaon</Text>
                 <Text color={"#969491"}>Pune</Text>
                 <Text color={"#bdb3b6"}>Kolkata</Text>
                 <Text color={"#969491"}>Hyderabad</Text>            
                 <Text color={"#bdb3b6"}>Chennai</Text>
                 <Text color={"#969491"}>Bangalore</Text>
                 <Text color={"#969491"}>& more.</Text>
             </Flex>
           </Box>
      </Box>
      <Box w={"48%"}>
          <Image src={"/brooke-lark-HlNcigvUi4Q-unsplash.jpg"} alt={"cover"}/>
      </Box>
    </Flex>
    <OrderDeliveryTrackingComponent/>
    <BannerAppStore/>
    </Box>
  )
}

export default Home