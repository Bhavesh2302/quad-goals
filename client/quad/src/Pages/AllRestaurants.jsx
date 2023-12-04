import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { getRestaurants } from "../Redux/Reducers/RestaurantReducer/action";
import { ImSpoonKnife } from "react-icons/im";
import { FaStar } from "react-icons/fa";
import { SimpleGrid } from "@chakra-ui/react";
import RestaurantSkeleton from "../Components/Skeletons/RestaurantSkeleton";

const AllRestaurants = () => {
  const dispatch = useDispatch();
  const { city } = useParams();
  const [sortBy, setSortBy] = useState("asc");
  const [deliveryTime, setDeliveryTime] = useState("desc");
  const { allRestaurants: restaurants, isLoading } = useSelector(
    (state) => state.restaurantReducer
  );

  useEffect(() => {
    dispatch(getRestaurants(city, sortBy));
  }, [sortBy, city]);

  return (
    <Box w="100%">
      <Navbar />
      <Box>
        {restaurants.length === 0 && (
          <Heading>Sorry No Restaurants Found</Heading>
        )}
      </Box>

      <Flex
        w={{ base: "95%", sm: "90%", md: "90%", lg: "88%" }}
        m="auto"
        direction={{ base: "column", sm: "column", md: "column", lg: "row" }}
        justifyContent={{
          base: "flex-start",
          sm: "flex-start",
          md: "flex-start",
          lg: "space-evenly"
        }}
        alignItems={"center"}
        color={"#282c3f"}
        p="15px"
        fontWeight="300"
      >
        <Box
          w={{ base: "100%", sm: "100%", md: "100%", lg: "30%" }}
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
          w={{ base: "100%", sm: "100%", md: "100%", lg: "70%" }}
          direction={"row"}
          gap={{ base: "10px", sm: "10px", md: "12px", lg: "30px" }}
          flexWrap={"wrap"}
          color={"##282c3f"}
          justifyContent={{
            base: "flex-start",
            sm: "flex-start",
            md: "flex-start",
            lg: "flex-end"
          }}
          alignItems={"center"}
        >
          <Box>
            <Button
              variant={"solid"}
              bg={"#83cd29"}
              color={"white"}
              size={{ base: "xs", sm: "sm", md: "sm", lg: "sm" }}
              _hover={{ color: "red", cursor: "pointer", bg: "none" }}
            >
              Relevance
            </Button>
          </Box>
          <Box>
            <Button
              variant={"solid"}
              bg={"#83cd29"}
              color={"white"}
              size={{ base: "xs", sm: "sm", md: "sm", lg: "sm" }}
              _hover={{ color: "red", cursor: "pointer", bg: "none" }}
              onClick={() => {
                console.log("hello");
                console.log(deliveryTime);
                setDeliveryTime("desc");
              }}
            >
              Delivery Time
            </Button>
          </Box>
          <Box>
            <Button
              variant={"solid"}
              bg={"#83cd29"}
              color={"white"}
              size={{ base: "xs", sm: "sm", md: "sm", lg: "sm" }}
              _hover={{ color: "red", cursor: "pointer", bg: "none" }}
              onClick={() => {
                setSortBy("asc");
              }}
            >
              Cost Low To High
            </Button>
          </Box>
          <Box>
            <Button
              variant={"solid"}
              bg={"#83cd29"}
              color={"white"}
              size={{ base: "xs", sm: "sm", md: "sm", lg: "sm" }}
              _hover={{ color: "red", cursor: "pointer", bg: "none" }}
              onClick={() => setSortBy("desc")}
            >
              Cost High to Low
            </Button>
          </Box>
          <Box>
            <Button
              variant={"solid"}
              bg={"#83cd29"}
              color={"white"}
              size={{ base: "xs", sm: "sm", md: "sm", lg: "sm" }}
              _hover={{ color: "red", cursor: "pointer", bg: "none" }}
            >
              Rating
            </Button>
          </Box>
          <Box>
            <Button
              display={"flex"}
              variant={"solid"}
              bg={"#83cd29"}
              color={"white"}
              size={{ base: "xs", sm: "sm", md: "sm", lg: "sm" }}
              gap="10px"
              _hover={{ color: "red", cursor: "pointer", bg: "none" }}
            >
              <Text>Filters</Text>
              <Box
                border={"1px solid #eee"}
                p="10px"
                borderRadius={"50%"}
                borderColor={"transparent"}
              >
                <ImSpoonKnife color="#f9791e" size={"15px"} />
              </Box>
            </Button>
          </Box>
        </Flex>
      </Flex>
      <hr w="100%" />
      <SimpleGrid columns={[1, 2, 2, 4]} w="88%" m="auto" mt="20px" pb="20px">
        {isLoading &&
          new Array(8)
            .fill(0)
            .map(() => <RestaurantSkeleton height="350px" mainPage={true} />)}
        {restaurants.length > 0 &&
          restaurants.map((item) => (
            <Link key={item._id} to={`/allrestaurants/${city}/${item._id}`}>
              {/* <Box
                textAlign="left"
                height={"350px"}
                p="25px"
                position={"relative"}
                _hover={{
                  boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;",
                  border: "0.3px solid #e0e5e9"
                }}
              >
                <Image src={item.image_rest} position="relative" />
                <Box
                  bg={"#3a3c41"}
                  color="white"
                  position="absolute"
                  top="9"
                  w={"80px"}
                  textOverflow={"ellipsis"}
                  overflow="hidden"
                  borderRadius={"2px"}
                  left="0px"
                  p="0px 5px"
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  fontSize={"10px"}
                  textShadow="inherit"
                  transform={"rotate(-40deg)"}
                  letterSpacing={"1px"}
                  textTransform={"uppercase"}
                >
                  {item.promoted === "promoted" ? "promoted" : ""}
                </Box>
                <Box mt="10px">
                  <Text
                    fontWeight={"600"}
                    w="100%"
                    height="20px"
                    textOverflow={"ellipsis"}
                    overflow="hidden"
                  >
                    {item.rest_name}
                  </Text>
                </Box>
                <Box height="30px" fontSize={"14px"} color={"#686b78"}>
                  {item.cuisines.join(", ")}
                </Box>
                <Box
                  display={"flex"}
                  fontSize={"14px"}
                  justifyContent="space-between"
                  alignItems={"center"}
                  mt="15px"
                >
                  <Box
                    display={"flex"}
                    justifyContent={"space-evenly"}
                    borderRadius="4px"
                    gap="2px"
                    p="0px 5px"
                    alignItems={"center"}
                    color="white"
                    bg={item.rating > 4.0 ? "#48c479" : "#f9791e"}
                  >
                    <Box>
                      <FaStar fontSize={"12px"} />
                    </Box>
                    <Box>
                      <Text>{`${item.rating}`}</Text>
                    </Box>
                  </Box>
                  <Box>.</Box>
                  <Box color={"#686b78"}>{`${item.d_time} MINS`}</Box>
                  <Box>.</Box>
                  <Box color={"#686b78"}>{`₹ ${item.cost} For Two`}</Box>
                </Box>
                <Box></Box>
              </Box> */}
              <Box
                w={{ base: "100%", sm: "100%", md: "45%", lg: "300px" }}
                h="300px"
                borderRadius="5px"
                position="relative"
                _hover={{
                  boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;",
                  border: "0.3px solid #e0e5e9",
                  p: "10px"
                }}
                p="10px"
              >
                <Box h="155px" w="100%">
                  <Image
                    w="100%"
                    h="100%"
                    src={item.image_rest}
                    objectFit="fill"
                    borderTopRadius="5px"
                  />
                </Box>
                <Box p="10px" bg="white" borderBottomRadius="5px">
                  <Text
                    fontWeight="600"
                    w="100%"
                    height="20px"
                    textOverflow="ellipsis"
                    overflow="hidden"
                  >
                    {item.rest_name}
                  </Text>
                  <Box
                    height="15px"
                    fontSize="14px"
                    color="#686b78"
                    textAlign="start"
                  >
                    {item.cuisines.join(", ")}
                  </Box>
                  <Box
                    display="flex"
                    fontSize="14px"
                    justifyContent="space-between"
                    alignItems="center"
                    mt="15px"
                  >
                    <Box
                      display="flex"
                      justifyContent="space-evenly"
                      borderRadius="4px"
                      gap="2px"
                      p="0px 5px"
                      alignItems="center"
                      color="white"
                      bg={item.rating > 4 ? "#48c479" : "#f9791e"}
                    >
                      <Box>
                        <FaStar fontSize="12px" />
                      </Box>
                      <Box>
                        <Text>{item.rating}</Text>
                      </Box>
                    </Box>
                    <Box>|</Box>
                    <Box color="#686b78">{`${item.d_time} MINS`}</Box>
                    <Box>|</Box>
                    <Box color="#686b78">{`₹ ${item.cost} For Two`}</Box>
                  </Box>
                  <Box textAlign="start" color="#686b78" fontSize="14px">
                    {item.address}
                  </Box>
                </Box>
              </Box>
            </Link>
          ))}
      </SimpleGrid>
    </Box>
  );
};

export default AllRestaurants;
