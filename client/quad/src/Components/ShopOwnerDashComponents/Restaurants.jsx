import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantsOfShopowner } from "../../Redux/Reducers/ShopOwnerReducer/action";
import { BsShopWindow } from "react-icons/bs";

const Restaurants = () => {
  const dispatch = useDispatch();
  const restaurants = useSelector(
    (state) => state.shopOwnerReducer.restaurants
  );

  const shopOwner = useSelector((state) => state.userReducer.userData);

  const token = useSelector((state) => state.userReducer.token);

  console.log(restaurants);

  useEffect(() => {
    if (restaurants.length === 0)
      dispatch(getRestaurantsOfShopowner(shopOwner.id, token));
  }, []);

  return (
    <Box h="100%" w="100%">
      <Flex w="100%" h="100%" alignItems="center" justifyContent="center">
        {restaurants.length !== 0 ? (
          restaurants.map((_el) => <Box></Box>)
        ) : (
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
              <Button bg="green.500" color="white" _hover={{ bg: "blue.500" }}>
                Add New Restaurant
              </Button>
            </Box>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default Restaurants;
