import { Button,Box, Input, FormControl, FormLabel, } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRestaurantOfShopOwner } from "../../Redux/Reducers/ShopOwnerReducer/action";


export const RestaurantForm = () => {
const shopOwner = useSelector((state) => state.userReducer.userData);
const token = useSelector((state) => state.userReducer.token);
const dispatch = useDispatch()

  const [inputs, setInputs] = useState({
    image_rest:"",
    rest_name :"",
    cuisines:[],
    rating :"",
    d_time:"",
    cost:"",
    offer :"none", //by default we will take this none for now
    promoted :"none", //by default we will take this none for now
    city:"",
    address:"",
    menu:[], 
    userId:shopOwner?.id,
  });

  console.log("restaurant form page ");
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const cuisineArray = inputs.cuisines
      ? inputs.cuisines.split(",").map((value) => value.trim())
      : [];
    const payload = { ...inputs, cuisines:cuisineArray };
    console.log(payload)

    dispatch(addRestaurantOfShopOwner(payload,token))

  };

  return (
    <Box display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    height="100vh"
    >

      <Box p="4" boxShadow="lg" width="400px">
      <FormControl mb="4">
      <FormLabel>Restaurant Image
          <Input type={"text"}
          value={inputs.image_rest}
           name={"image_rest"}
            onChange={handleChange} />
      </FormLabel>

      <FormControl mb="4">
          <FormLabel>Restaurant Name</FormLabel>
          <Input
            type="text"
            name="rest_name"
            value={inputs.rest_name}
            onChange={handleChange}
          />
        </FormControl>
        <FormLabel>
          Cuisines 
          <br />
          (Enter Multiple Values (comma-separated))
          <Input
            type={"text"}
            name="cuisines"
            value={inputs.cuisines}
            onChange={handleChange}
          />
        </FormLabel>

        <FormLabel>
          Rating
          <Input
            type={"number"}
            name={"rating"}
            value={inputs.rating}
            onChange={handleChange}
          />
        </FormLabel>

        <FormLabel>
          Delivery Time
          <Input
            type={"text"}
            name={"d_time"}
            value={inputs.d_time}
            onChange={handleChange}
          />
        </FormLabel>

        <FormLabel>
          Cost
          <Input
            type={"number"}
            name={"cost"}
            value={inputs.cost}
            onChange={handleChange}
          />
        </FormLabel>

        <FormLabel>
          Address
          <Input
            type={"text"}
            name={"address"}
            value={inputs.address}
            onChange={handleChange}
          />
        </FormLabel>

        <FormLabel>
          City
          <Input
            type={"text"}
            name={"city"}
            value={inputs.city}
            onChange={handleChange}
          />
        </FormLabel>

        {/* <FormLabel>
          State
          <Input
            type={"text"}
            name={"state"}
            value={inputs.state}
            onChange={handleChange}
          />
        </FormLabel> */}

        <Button colorScheme="green" onClick={handleSubmit} mt='3'> Submit </Button>
        </FormControl>
      </Box>
      
    </Box>
  );
};
