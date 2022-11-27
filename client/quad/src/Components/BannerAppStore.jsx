import React from 'react'
import {Box, Image, Text} from "@chakra-ui/react"
 
const BannerAppStore = () => {
  return (
    <Box width={"100%"} bg="white" display={"flex"} justifyContent="flex-start" letterSpacing={"1.2px"}>
        {/*  play store and apple store */}
        <Box width="50%">

            <Box w="100%"  margin={"auto"} mt="30px" height={"200px"}  p={{base: "14px", sm:"14px", md : "20px",lg:"30px"}}>
              <Box w="100%">
                  <Text textAlign={"left"} fontSize={{base: "12px", sm:"12px", md : "18px",lg:"30px"}} fontWeight="bold">Restaurants in your pocket</Text>
              </Box>
              <Box mt="15px">
                  <Text textAlign={"left"} fontSize={{base: "12px", sm:"12px", md : "18px",lg:"30px"}} color={"gray"}>Order from your favourite restaurants & track <br/>on the go with all-new Swiggy app.</Text>
              </Box>
              <Box display={"flex"} alignItems="center" gap="20px" mt={{base: "12.5px", sm:"12.5px", md : "25px",lg:"50px"}}>
                <Image height={{base: "15px", sm:"15px", md : "30px",lg:"60px"}} src={"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200,h_65/icon-AppStore_lg30tv"} alt={"appleStore"}/>
                <Image height={{base: "15px", sm:"15px", md : "30px",lg:"60px"}} src={"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200,h_65/icon-GooglePlay_1_zixjxl"} alt={"playStore"}/>
              </Box>
            </Box>
        </Box>

        {/* mobile images */}
        <Box width="50%" display={"flex"}>
            <Box><Image src='https://i.imgur.com/yGkRXbJ.png' alt={"first-image"}></Image></Box>
            <Box><Image src="https://i.imgur.com/3cbUU2L.png" alt="second-image"></Image></Box>
        </Box>

    </Box>
  )
}

export default BannerAppStore