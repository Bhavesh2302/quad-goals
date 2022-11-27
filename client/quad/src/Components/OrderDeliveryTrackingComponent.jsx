import { Flex, Box, Image, Text } from '@chakra-ui/react'
import React from 'react'

const OrderDeliveryTrackingComponent = () => {
  return (
    <Flex w={{base: "100%", sm: "100%", md: "100%", lg:"100%"}} m={"auto"} h={"auto"} borderTop={"40px solid black"} borderBottom={"40px solid black"} direction={{base: "column", sm: "column", md: "row", lg:"row"}} gap={"10px"}>
          <Box w={{base: "100%", sm: "100%", md: "33.33%",lg:"33.33%"}} > 
                <Box w={{base: "250px", sm:"250px", md: "200px", lg:"250px"}} h={"180px"} m={"auto"}>
                    <Image  objectFit={"contain"} w={"100%"}  src={"https://img.freepik.com/premium-vector/fast-delivery-icon-express-delivery-urgent-delivery-services-stopwatch-sign_349999-859.jpg?w=2000"} alt={"fast delivery"}/>
                </Box>
                <Box w={{base: "350px", sm:"350px", md: "240px", lg:"350px"}} m={"auto"} >
                    <Text fontSize={{base: "16px", sm: "16px", md: "14.5",lg:"16px"}} fontWeight={"650"} color={"black"}>Fast Order Delivery</Text>
                    <Text  fontSize={{base: "14.5px", sm: "14.5px", md: "12.5px", lg:"14.5px"}} fontWeight={"550"} color={"black"}>Experience Swiggy's superfast delivery for food delivered fresh & on time</Text>
                </Box>
          </Box>
          <Box  w={{base: "100%", sm: "100%", md: "33.33%",lg:"33.33%"}}>
                <Box w={{base: "250px", sm:"250px", md: "200px", lg:"250px"}} h={"180px"} m={"auto"}>
                    <Image w={"250px"} pt={"20px"} src={"https://restaurantindia.s3.ap-south-1.amazonaws.com/s3fs-public/content6329.jpg"} alt={""}/>
                </Box>
                <Box w={{base: "350px", sm:"350px", md: "240px", lg:"350px"}} m={"auto"} >
                    <Text fontSize={{base: "16px", sm: "16px", md: "14.5px",lg:"16px"}} fontWeight={"650"} color={"black"}>No Minimum Order</Text>
                    <Text  fontSize={{base: "14.5px", sm: "14.5px", md: "12.5px", lg:"14.5px"}}fontWeight={"550"} color={"black"}>Order in for yourself or for the group, with no restrictions on order value</Text>
                </Box>
          </Box>
          <Box  w={{base: "100%", sm: "100%", md: "33.33%",lg:"33.33%"}} >
                <Box w={{base: "250px", sm:"250px", md: "200px", lg:"250px"}} h={"180px"} m={"auto"}>
                    <Image w={"100%"} objectFit={"contain"} src={"https://www.scoopearth.com/wp-content/uploads/2022/10/way-concept-illustration_114360-1191-1024x683.jpg"} alt={""}/>
                </Box>
                <Box w={{base: "350px", sm:"350px", md: "240px", lg:"350px"}} m={"auto"} >
                    <Text fontSize={{base: "16px", sm: "16px", md: "14.5",lg:"16px"}} fontWeight={"650"} color={"black"}>Live Order Tracking</Text>
                    <Text fontSize={{base: "14.5px", sm: "14.5px", md: "12.5px", lg:"14.5px"}} fontWeight={"550"} color={"black"}>Know where your order is at all times, from the restaurant to your doorstep</Text>
                </Box>
          </Box>
    </Flex>
  )
}

export default OrderDeliveryTrackingComponent