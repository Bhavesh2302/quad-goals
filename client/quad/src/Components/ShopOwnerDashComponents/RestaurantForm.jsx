import { Button, Box, Flex, Tooltip } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addRestaurantOfShopOwner,
  editRestaurantOfShopOwner,
  getRestaurantsOfShopowner
} from "../../Redux/Reducers/ShopOwnerReducer/action";
import InputField from "../../BaseComponents/InputField";
import { IoArrowBackCircleSharp } from "react-icons/io5";

export const RestaurantForm = ({ setAddNew, data, setIsEdit }) => {
  const shopOwner = useSelector((state) => state.userReducer.userData);
  const token = useSelector((state) => state.userReducer.token);
  const dispatch = useDispatch();

  const [restaurant, setRestaurant] = useState(
    data
      ? data
      : {
          image_rest: "",
          rest_name: "",
          cuisines: [],
          rating: "3.0",
          d_time: "",
          cost: "",
          offer: "none", //by default we will take this none for now
          promoted: "none", //by default we will take this none for now
          city: "",
          address: "",
          menu: [],
          userId: shopOwner?.id
        }
  );

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setRestaurant((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const cuisineList = restaurant.cuisines
      ? restaurant.cuisines.split(",").map((value) => value.trim())
      : [];

    const payload = { ...restaurant, cuisines: cuisineList };

    dispatch(addRestaurantOfShopOwner(payload, token)).then((res) => {
      if (res?.type === "ADD_RESTAURANT_OF_SHOPOWNER_SUCCESS")
        dispatch(getRestaurantsOfShopowner(shopOwner.id, token));
      setAddNew(false);
    });
  };

  const updateRestaurant = () => {
    dispatch(editRestaurantOfShopOwner(restaurant, token, data?._id)).then(
      (res) => {
        if (res?.type === "EDIT_RESTAURANT_OF_SHOPOWNER_SUCCESS") {
          dispatch(getRestaurantsOfShopowner(shopOwner.id, token));
          setIsEdit(false);
        }
      }
    );
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      h="700px"
      w="100%"
      bg="white"
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        w="100%"
        px="10px"
        py="10px"
      >
        <Tooltip label="Back to Restaurants" placement="end-end">
          <Box
            onClick={() => (data ? setIsEdit(false) : setAddNew(false))}
            fontSize={{ base: "14px", sm: "14px", md: "15px", lg: "18px" }}
            fontWeight="650"
            cursor="pointer"
            p="5px"
            borderRadius="50%"
            _hover={{ bg: "#dcdcdb" }}
          >
            <IoArrowBackCircleSharp />
          </Box>
        </Tooltip>
      </Flex>
      <Box w="95%" h="100%" pb="20px" pt="10px">
        <Box>
          <InputField
            title="Restaurant Image URL"
            value={restaurant.image_rest}
            onChange={handleChange}
            name="image_rest"
          />
        </Box>
        <Box>
          <InputField
            title="Restaurant Name"
            value={restaurant.rest_name}
            onChange={handleChange}
            name="rest_name"
          />
        </Box>
        <Box>
          <InputField
            title="City"
            value={restaurant.city}
            onChange={handleChange}
            name="city"
          />
        </Box>
        <Box>
          <InputField
            title="Address"
            value={restaurant.address}
            onChange={handleChange}
            name="address"
          />
        </Box>
        <Box>
          <InputField
            title="Couisines (Please add Qumma Separated values, e.g. Pasta, Cake, etc)"
            value={restaurant.cuisines}
            onChange={handleChange}
            name="cuisines"
          />
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
          gap="10px"
          w="100%"
        >
          <Box w={{ base: "100%", sm: "100%", md: "49%", lg: "49%" }}>
            <InputField
              title="Delivery Time in minutes"
              value={restaurant.d_time}
              onChange={handleChange}
              name="d_time"
            />
          </Box>
          <Box w={{ base: "100%", sm: "100%", md: "49%", lg: "49%" }}>
            <InputField
              title="Cost of cheapest menu"
              value={restaurant.cost}
              onChange={handleChange}
              name="cost"
            />
          </Box>
        </Box>
        <Box w="100%">
          <Button
            h={{ base: "40px", sm: "40px", md: "45px", lg: "45px" }}
            fontSize={{ base: "12px", sm: "12px", md: "14px", lg: "14px" }}
            borderRadius="0"
            w="100%"
            bg="green.500"
            color="white"
            _hover={{ bg: "blue.500" }}
            onClick={data ? updateRestaurant : handleSubmit}
          >
            {data ? "Update" : "Save"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
