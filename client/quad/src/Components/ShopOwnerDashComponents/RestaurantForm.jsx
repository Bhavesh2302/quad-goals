import {
  Button,
  Box,
  Flex,
  Tooltip,
  useToast,
  Text,
  Input,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addRestaurantOfShopOwner,
  editRestaurantOfShopOwner,
  getRestaurantsOfShopowner,
} from "../../Redux/Reducers/ShopOwnerReducer/action";
import InputField from "../../BaseComponents/InputField";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { BiCloudUpload } from "react-icons/bi";

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
          offer: "none", 
          promoted: "none", 
          city: "",
          address: "",
          menu: [],
          userId: shopOwner?.id,
        }
  );

  const [uploadedImage, setUploadedImage] = useState(data?.image_rest || null);
  const fileInputRef = useRef(null);
  const toast = useToast();


  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleImageUpload({ target: { files: [file] } });
  };

  
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setTimeout(() => {
          setUploadedImage(reader.result);
        }, 100);
        setTimeout(() => {
          setRestaurant((prev) => ({
            ...prev,
            image_rest: file,
          }));
        }, 1000);

        console.log(restaurant);
        toast({
          title: "Image uploaded successfully!",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      };

      reader.readAsDataURL(file);
    } else {
      toast({
        title: "No file selected!",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    toast({
      title: "Image removed!",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setRestaurant((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();

    const cuisineList = restaurant?.cuisines
      ? restaurant?.cuisines?.split(",").map((value) => value.trim())
      : [];

    formData.append("image_rest", restaurant.image_rest);
    formData.append("rest_name", restaurant.rest_name);
    formData.append("cuisines", cuisineList);
    formData.append("rating", restaurant.rating);
    formData.append("d_time", restaurant.d_time);
    formData.append("cost", restaurant.cost);
    formData.append("offer", restaurant.offer);
    formData.append("promoted", restaurant.promoted);
    formData.append("city", restaurant.city);
    formData.append("address", restaurant.address);
    formData.append("menu", restaurant.menu);
    formData.append("userId", shopOwner?.id);

    dispatch(addRestaurantOfShopOwner(formData, token)).then((res) => {
      if (res?.type === "ADD_RESTAURANT_OF_SHOPOWNER_SUCCESS")
        dispatch(getRestaurantsOfShopowner(shopOwner.id, token));
      setAddNew(false);
    });
  };

  const updateRestaurant = async (event) => {
    event.preventDefault();
    console.log(restaurant, "resData");
    const cuisineList =
      typeof restaurant.cuisines === "string"
        ? restaurant?.cuisines?.split(",").map((value) => value.trim())
        : restaurant?.cuisines;

    const formData = new FormData();
    formData.append("image_rest", restaurant.image_rest);
    formData.append("rest_name", restaurant.rest_name);
    formData.append("cuisines", cuisineList);
    formData.append("rating", restaurant.rating);
    formData.append("d_time", restaurant.d_time);
    formData.append("cost", restaurant.cost);
    formData.append("offer", restaurant.offer);
    formData.append("promoted", restaurant.promoted);
    formData.append("city", restaurant.city);
    formData.append("address", restaurant.address);
    formData.append("menu", restaurant.menu);
    formData.append("userId", shopOwner?.id);
    console.log(formData, "formData");
    dispatch(editRestaurantOfShopOwner(formData, token, data?._id)).then(
      (res) => {
        if (res?.type === "EDIT_RESTAURANT_OF_SHOPOWNER_SUCCESS") {
          dispatch(getRestaurantsOfShopowner(shopOwner.id, token));
          setIsEdit(false);
        }
      }
    );
  };

  return (
    <form
      action={
        data ? `restaurant/update/${restaurant._id}` : "/restaurant/create"
      }
      method={data ? "PATCH" : "POST"}
      encType="multipart/form-data"
      onSubmit={data ? updateRestaurant : handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        alignItems: "center",
        height: "1000px",
        width: "100%",
        background: "white",
      }}
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        w="100%"
        px="6px"
        py="6px"
        mt="35px"
      >
        <Tooltip label="Back to Restaurants" placement="right">
          <Box
            onClick={() => (data ? setIsEdit(false) : setAddNew(false))}
            fontSize={{ base: "15px", sm: "15px", md: "20px", lg: "25px" }}
            fontWeight="650"
            cursor="pointer"
            p="5px"
            borderRadius="50%"
            _hover={{ bg: "#dcdcdb" }}
          >
            <IoArrowBackCircleSharp />
          </Box>
        </Tooltip>
        <Box
          fontSize={{ base: "12px", sm: "12px", md: "14px", lg: "16px" }}
          fontWeight="650"
        >
          Restaurant Details
        </Box>
        <Box></Box>
      </Flex>
      <Box w="95%" h="100%" pb="20px" pt="10px">
        <Box width="100%">
          <Box>
            <Box fontSize="sm" textAlign={"left"} fontWeight={"600"} mb={1}>
              Restaurant Image
            </Box>
            <Box
              border={uploadedImage ? "none" : "2px dashed"}
              borderColor={uploadedImage ? "none" : "gray.300"}
              borderRadius="md"
              p={4}
              textAlign="center"
              cursor="pointer"
              position="relative"
              bg={uploadedImage ? "transparent" : "gray.50"}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileInputRef.current.click()}
            >
              {uploadedImage ? (
                <Box>
                  <img
                    src={
                      typeof uploadedImage === "string"
                        ? uploadedImage
                        : URL.createObjectURL(uploadedImage)
                    }
                    alt="Uploaded logo"
                    style={{
                      width: "80%",
                      height: "250px",
                      objectFit: "fill",
                      margin: "0 auto",
                      borderRadius: "6px",
                    }}
                  />
                  <Button
                    mt={2}
                    colorScheme="red"
                    size="sm"
                    onClick={handleRemoveImage}
                  >
                    Remove Image
                  </Button>
                </Box>
              ) : (
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  height="80px"
                >
                  <BiCloudUpload size="40px" color="purple" />
                  <Text
                    fontSize="sm"
                    mt={2}
                    color="gray.500"
                    textAlign="center"
                  >
                    Click to Upload <br /> or drag and drop an image here
                  </Text>
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    name="image_rest"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    cursor="pointer"
                    style={{
                      display: "none",
                    }}
                    onChange={handleImageUpload}
                  />
                </Box>
              )}
            </Box>
          </Box>

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
            title="Cuisines (Please add Comma Separated values, e.g. Pasta, Cake, etc)"
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
              title="Cost Per Person"
              value={restaurant.cost}
              onChange={handleChange}
              name="cost"
            />
          </Box>
        </Box>
        <Box w="100%">
          <Input
            h={{ base: "40px", sm: "40px", md: "45px", lg: "45px" }}
            fontSize={{ base: "12px", sm: "12px", md: "14px", lg: "14px" }}
            borderRadius="0"
            w="100%"
            bg="green.500"
            color="white"
            _hover={{ bg: "blue.500" }}
            type="submit"
            value={data ? "Update" : "Save"}
          />
        </Box>
      </Box>
    </form>
  );
};
