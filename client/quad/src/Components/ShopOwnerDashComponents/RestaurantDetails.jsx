import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getRestaurantMenus,
  getSingleRestaurant
} from "../../Redux/Reducers/ShopOwnerReducer/action";
import UserInfo from "../UserInfo";
import StarRating from "../StarRating";
import RestaurantMenus from "./RestaurantMenus";

const RestaurantDetails = () => {
  const { token } = useSelector((state) => state.userReducer);
  const { restaurant, isLoading, menus } = useSelector(
    (state) => state.shopOwnerReducer.restaurantData
  );
  const dispatch = useDispatch();
  const { restId } = useParams();
  console.log(restId, restaurant, isLoading, menus);

  useEffect(() => {
    dispatch(getSingleRestaurant(restId, token));
    dispatch(getRestaurantMenus(restId));
  }, [restId]);

  return (
    <Box w="100%" h="auto" mb="50px" mt="20px">
      <Box
        w={{ base: "95%", sm: "95%", md: "95%", lg: "80%" }}
        m="auto"
        backgroundColor="white"
        h="60px"
        mb="10px"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        px="20px"
      >
        <Flex alignItems="center" justifyContent="flex-start">
          <Link to="/">
            <Image
              src="https://i.imgur.com/Gex3smL.jpg"
              w={"100px"}
              h={"45px"}
            />
          </Link>
        </Flex>
        <Box fontWeight="650" fontSize="15px">
          <UserInfo />
        </Box>
      </Box>
      <Box
        w={{ base: "95%", sm: "95%", md: "95%", lg: "80%" }}
        m="auto"
        backgroundColor="white"
        mt="50px"
      >
        <Box
          h="220px"
          w="100%"
          display="flex"
          alignItems="flex-start"
          p="5px"
          borderRadius="5px"
        >
          <Box h="210px" w="350px" borderRadius="5px">
            <Image
              src={restaurant?.image_rest}
              w="100%"
              h="100%"
              borderRadius="5px"
            />
          </Box>
          <Box w="calc(100% - 250px)" textAlign="left" pt="40px">
            <Box
              pl="20px"
              fontWeight="650"
              fontSize={{ base: "18px", sm: "18px", md: "22px", lg: "22px" }}
            >
              {restaurant.rest_name}
            </Box>
            <Box display="flex">
              <Box
                display="flex"
                justifyContent="flex-start"
                flexDirection="column"
                textAlign="left"
                pl="20px"
                gap="5px"
                pt="10px"
              >
                <Box
                  fontWeight="550"
                  fontSize={{
                    base: "14px",
                    sm: "14px",
                    md: "14px",
                    lg: "15px"
                  }}
                >
                  {restaurant.address}
                </Box>
                <Box
                  fontWeight="550"
                  fontSize={{
                    base: "14px",
                    sm: "14px",
                    md: "14px",
                    lg: "15px"
                  }}
                >
                  {restaurant?.cuisines?.join(", ")}
                </Box>
                <Box
                  fontWeight="550"
                  fontSize={{
                    base: "14px",
                    sm: "14px",
                    md: "14px",
                    lg: "15px"
                  }}
                >
                  <StarRating stars={restaurant?.rating} />
                </Box>
              </Box>
              <Box
                display="flex"
                justifyContent="flex-start"
                flexDirection="column"
                textAlign="left"
                pl="100px"
                gap="5px"
                pt="20px"
              >
                <Box
                  fontWeight="550"
                  fontSize={{
                    base: "14px",
                    sm: "14px",
                    md: "14px",
                    lg: "15px"
                  }}
                >
                  ₹ {restaurant.cost} for two persons
                </Box>
                <Box
                  fontWeight="550"
                  fontSize={{
                    base: "14px",
                    sm: "14px",
                    md: "14px",
                    lg: "15px"
                  }}
                >
                  Delivery in {restaurant.d_time} minutes
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        w={{ base: "95%", sm: "95%", md: "95%", lg: "80%" }}
        h="100%"
        m="auto"
      >
        <Text
          fontWeight="550"
          fontSize={{
            base: "14px",
            sm: "14px",
            md: "14px",
            lg: "15px"
          }}
        >
          Menus
        </Text>
        <RestaurantMenus menus={menus} />
      </Box>
    </Box>
  );
};

export default RestaurantDetails;
