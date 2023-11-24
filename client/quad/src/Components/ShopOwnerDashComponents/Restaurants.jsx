import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantsOfShopowner } from "../../Redux/Reducers/ShopOwnerReducer/action";
import { BsShopWindow } from "react-icons/bs";
import RestaurantSkeleton from "../Skeletons/RestaurantSkeleton";
import { FaStar } from "react-icons/fa";

const Restaurants = () => {
  const dispatch = useDispatch();
  const { restaurants, isLoading } = useSelector(
    (state) => state.shopOwnerReducer
  );
  const shopOwner = useSelector((state) => state.userReducer.userData);
  const token = useSelector((state) => state.userReducer.token);

  useEffect(() => {
    dispatch(getRestaurantsOfShopowner(shopOwner.id, token));
  }, [shopOwner.id, token, dispatch]);

  const handleAddNewRestaurant = () => {};

  return (
    <Box h="100%" w="100%">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        p="10px"
        bg="white"
      >
        <Button
          bg="green.500"
          color="white"
          _hover={{ bg: "#f3f3f3", color: "black" }}
          onClick={handleAddNewRestaurant}
        >
          Add New
        </Button>
      </Box>
      <Flex
        w="100%"
        pt="25px"
        alignItems="center"
        justifyContent="flex-start"
        px="20px"
        gap="20px"
      >
        {isLoading ? (
          new Array(3).fill(0).map((_, i) => <RestaurantSkeleton key={i} />)
        ) : restaurants.length !== 0 ? (
          restaurants.map((item) => (
            <Box w="250px" h="auto" borderRadius="5px">
              <Image w="100%" src={item.image_rest} borderTopRadius="5px" />
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
                  height="30px"
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
          ))
        ) : isLoading === false && restaurants.length === 0 ? (
          <Flex w="100%" alignItems="center" justifyContent="center" pb="100px">
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              gap="15px"
            >
              <Box>
                <BsShopWindow fontSize="60px" />
              </Box>
              <Text fontSize="16px" fontWeight="550">
                No Restaurant Added
              </Text>
              <Button
                bg="green.500"
                color="white"
                _hover={{ bg: "blue.500" }}
                onClick={handleAddNewRestaurant}
              >
                Add New Restaurant
              </Button>
            </Box>
          </Flex>
        ) : null}
      </Flex>
    </Box>
  );
};

export default Restaurants;
