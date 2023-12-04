import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteRestaurantOfShopOwner,
  getRestaurantsOfShopowner
} from "../../Redux/Reducers/ShopOwnerReducer/action";
import { BsShopWindow } from "react-icons/bs";
import RestaurantSkeleton from "../Skeletons/RestaurantSkeleton";
import { RestaurantForm } from "./RestaurantForm";
import RestaurantCard from "./RestaurantCard";

const Restaurants = ({ addNew, setAddNew }) => {
  const dispatch = useDispatch();
  const { restaurants, isLoading } = useSelector(
    (state) => state.shopOwnerReducer
  );
  const shopOwner = useSelector((state) => state.userReducer.userData);
  const token = useSelector((state) => state.userReducer.token);
  const [isEdit, setIsEdit] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    dispatch(getRestaurantsOfShopowner(shopOwner.id, token));
  }, [shopOwner.id, token, dispatch]);

  const handleEdit = (id) => {
    setIsEdit(true);
    const required = restaurants?.find((el) => el._id === id);
    console.log(required);
    setData(required);
  };

  const handleDelete = (id) => {
    dispatch(deleteRestaurantOfShopOwner(id, token)).then((res) => {
      if (res?.type === "DELETE_RESTAURANT_OF_SHOPOWNER_SUCCESS")
        dispatch(getRestaurantsOfShopowner(shopOwner.id, token));
    });
  };

  const handleAddNewRestaurant = () => setAddNew(true);

  return isEdit ? (
    <RestaurantForm setAddNew={setAddNew} data={data} setIsEdit={setIsEdit} />
  ) : (
    <Box h="600px" w="100%">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        p="10px"
        bg="white"
        m="auto"
        w="100%"
      >
        <Button
          bg="green.500"
          color="white"
          _hover={{ bg: "#f3f3f3", color: "black" }}
          onClick={handleAddNewRestaurant}
          p="3px 8px 3px 8px"
          h={{ base: "24px", sm: "24px", md: "28px", lg: "30px" }}
          fontSize={{ base: "10px", sm: "10px", md: "12px", lg: "14px" }}
        >
          Add New
        </Button>
      </Box>
      <Flex
        w="100%"
        pt="25px"
        h="600px"
        justifyContent="flex-start"
        px="20px"
        gap="20px"
        flexWrap="wrap"
        overflowX="hidden"
        overflowY="auto"
      >
        {isLoading ? (
          new Array(3).fill(0).map((_, i) => <RestaurantSkeleton key={i} />)
        ) : restaurants.length !== 0 ? (
          restaurants.map((item, i) => (
            <RestaurantCard
              {...item}
              key={i}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
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
                p="3px 8px 3px 8px"
                h={{ base: "24px", sm: "24px", md: "28px", lg: "30px" }}
                fontSize={{ base: "10px", sm: "10px", md: "12px", lg: "14px" }}
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
