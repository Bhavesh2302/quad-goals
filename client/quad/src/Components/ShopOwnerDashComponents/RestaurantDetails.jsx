import { Box, Flex, Image, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getRestaurantMenus,
  getSingleRestaurant
} from "../../Redux/Reducers/ShopOwnerReducer/action";
import UserInfo from "../UserInfo";
import StarRating from "../StarRating";
import RestaurantMenus from "./RestaurantMenus";
import { AddEditMenuDrawer } from "../../Drawers";

const RestaurantDetails = () => {
  const { token } = useSelector((state) => state.userReducer);
  const { restaurant, menus } = useSelector(
    (state) => state.shopOwnerReducer.restaurantData
  );
  const dispatch = useDispatch();
  const { restId } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  useEffect(() => {
    dispatch(getSingleRestaurant(restId, token));
    dispatch(getRestaurantMenus(restId));
  }, [restId, token, dispatch]);

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
          h="auto"
          w="100%"
          display="flex"
          alignItems="flex-start"
          p="5px"
          borderRadius="5px"
          flexDirection={{ base: "column", sm: "column", md: "row"}}
        >
          <Box h="210px" w={{base: "100%", sm: "100%", md: "450px", lg: "450px"}} borderRadius="5px">
            <Image
              src={restaurant?.image_rest}
              w="100%"
              h="100%"
              borderRadius="5px"
            />
          </Box>
          <Box w="100%" textAlign="left" pt="40px">
            <Box
              pl={{base: "20px", sm: "10px", md: "10px", lg: "20px"}}
              fontWeight="650"
              fontSize={{ base: "18px", sm: "18px", md: "22px", lg: "22px" }}
            >
              {restaurant.rest_name}
            </Box>
            <Box display="flex" flexDirection={{ base: "column", sm: "column", md: "row"}}>
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
                pl={{base: "20px", sm: "20px", md: "40px", lg: "100px"}}
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
        m="auto"
        mt="10px"
      >
        <hr style={{ marginBottom: "20px" }} />
        <Box
          w="100%"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          h="40px"
          mb="40px"
        >
          <Box></Box>
          <Box
            fontWeight="550"
            fontSize={{
              base: "14px",
              sm: "14px",
              md: "16px",
              lg: "18px"
            }}
          >
            Menus
          </Box>
          <Box
            h="30px"
            w="120px"
            fontWeight="550"
            fontSize={{
              base: "12px",
              sm: "12px",
              md: "14px",
              lg: "14px"
            }}
            bg="green.500"
            color="white"
            borderRadius="4px"
            cursor="pointer"
          >
            <AddEditMenuDrawer
              btnRef={btnRef}
              onClose={onClose}
              onOpen={onOpen}
              isOpen={isOpen}
              title="Add New Menu"
              restaurant={restaurant}
              data={null}
            />
          </Box>
        </Box>
        <RestaurantMenus
          menus={menus}
          btnRef={btnRef}
          onClose={onClose}
          onOpen={onOpen}
          isOpen={isOpen}
          restaurant={restaurant}
        />
      </Box>
    </Box>
  );
};

export default RestaurantDetails;
