import {
  Button,
  Box,
  Input,
  FormControl,
  FormLabel,
  Text
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRestaurantOfShopOwner } from "../../Redux/Reducers/ShopOwnerReducer/action";
import InputField from "../../BaseComponents/InputField";

export const RestaurantForm = () => {
  const shopOwner = useSelector((state) => state.userReducer.userData);
  const token = useSelector((state) => state.userReducer.token);
  const dispatch = useDispatch();

  const [restaurant, setRestaurant] = useState({
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
  });

  console.log("restaurant form page ");
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
    console.log(payload);
    dispatch(addRestaurantOfShopOwner(payload, token));
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="auto"
      h="100%"
      w="100%"
      bg="white"
    >
      <Text
        fontSize={{ base: "14px", sm: "14px", md: "16px", lg: "18px" }}
        fontWeight="600"
        pt="20px"
      >
        Restaurant Details
      </Text>
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
            title="Couisines (Please add Qumma Searated values, e.g. Pasta, Cake, etc)"
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
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
