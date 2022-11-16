import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { getRestaurantsByCity } from "../Redux/Reducers/RestaurantReducer/action";
import { ImSpoonKnife } from "react-icons/im";
import {FaStar} from "react-icons/fa"
import { SimpleGrid } from '@chakra-ui/react'

const AllRestaurants = () => {
  const dispatch = useDispatch();
  const { city } = useParams();
  const [sortBy ,setSortBy]=useState("asc")
  const restaurants = useSelector(
    (state) => state.restaurantReducer.allRestaurants
  );
  console.log(restaurants);

  useEffect(() => {
    if (restaurants.length === 0) {
      dispatch(getRestaurantsByCity(city));
    }
  }, [restaurants.length]);

  useEffect(()=>{
    dispatch(getRestaurantsByCity(city,sortBy));
  },[])

  return (
    <Box w="100%">
      <Navbar />
      <Box>
        {restaurants.length === 0 && (
          <Heading>Sorry No Restaurants Found</Heading>
        )}
         </Box>

        <Flex
          w="88%"
          m="auto"
          direction={"row"}
          justifyContent="space-between"
          alignItems={"center"}
          color={"#282c3f"}
          p="15px"
          fontWeight="300"
        >
          <Box
            w="30%"
            display="flex"
            justifyContent={"space-between"}
          >
            <Text
              textAlign={"left"}
              fontWeight="600"
              fontSize="28px"
            >{` ${restaurants.length} restaurants`}</Text>
          </Box>
          <Flex
            w="70%"
            direction={"row"}
            gap="30px"
            color={"##282c3f"}
            justifyContent="flex-end"
            alignItems={"center"}
          >
            <Box>
              <Button
                variant={"unstyled"}
                bg="none"
                _hover={{ color: "red", cursor: "pointer" }}
              >
                Relevance
              </Button>
            </Box>
            <Box>
              <Button
                variant={"unstyled"}
                _hover={{ color: "red", cursor: "pointer" }}
              >
                Delivery Time
              </Button>
            </Box>
            <Box>
              <Button
                variant={"unstyled"}
                _hover={{ color: "red", cursor: "pointer" }}
                onClick={()=>{
                  // console.log("hello")
                  setSortBy("asc")
                
                }}
              >
                Cost Low To High
              </Button>
            </Box>
            <Box>
              <Button
                variant={"unstyled"}
                _hover={{ color: "red", cursor: "pointer" }}
                onClick={()=>setSortBy("desc")}
              >
                Cost High to Low
              </Button>
            </Box>
            <Box>
              <Button
                variant={"unstyled"}
                _hover={{ color: "red", cursor: "pointer" }}
              >
                Rating
              </Button>
            </Box>
            <Box>
              <Button
                display={"flex"}
                variant={"unstyled"}
                gap="10px"
                _hover={{ color: "red", cursor: "pointer" }}
              >
                <Text>Filters</Text>
                <Box border={"1px solid #eee"} p="10px" borderRadius={"50%"}>
                  <ImSpoonKnife color="#f9791e" />
                </Box>
              </Button>
            </Box>
          </Flex>
        </Flex>
        <hr w="100%" />

        <SimpleGrid columns={[4]}  w="88%" m="auto" mt="20px">
        {restaurants.length > 0 &&
          restaurants.map((item) => (
            <Box key={item._id} textAlign="left" height={"350px"} p="25px" position={"relative"} _hover={
             { boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;" , border:"0.3px solid #e0e5e9",}
            //  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
            }>
              <Image src={item.image_rest} position="relative"/>
              <Box bg={"#3a3c41"} color="white" position="absolute" top="3"textOverflow={"ellipsis"} overflow="hidden" left="-0.4" p="0px 5px"fontSize={"14px"} textShadow="inherit" letterSpacing={"1px"}textTransform={"uppercase"}>{item.promoted==="promoted" ? "promoted":"" }</Box>
              <Box mt="10px">
                <Text fontWeight={"600"} w="100%" height="20px" textOverflow={"ellipsis"} overflow="hidden" >{item.rest_name}</Text>
                </Box>
              <Box height="30px" fontSize={"14px"} color={"#686b78"}>{item.cuisines.join(", ")}</Box>
              <Box display={"flex"}  fontSize={"14px"}  justifyContent="space-between" alignItems={"center"} mt="15px">
                <Box display={"flex"} justifyContent={"space-evenly"} borderRadius="4px" gap="2px" p="0px 5px"alignItems={"center"} color="white" bg={item.rating >4.0 ? "#48c479":"#f9791e"}> 
                <Box><FaStar fontSize={"12px"}/></Box>
                <Box><Text>{`${item.rating}`}</Text></Box>
                </Box>
                <Box>.</Box>
                <Box color={"#686b78"}>{item.d_time}</Box>
                <Box>.</Box>
                <Box color={"#686b78"}>{`₹ ${item.cost} For Two`}</Box>
              </Box>
              <Box></Box>
            </Box>
          ))}
          </SimpleGrid> 
     
    </Box>
  );
};

export default AllRestaurants;
