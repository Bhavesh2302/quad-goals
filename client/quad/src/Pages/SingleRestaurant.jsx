import { Box, Button, Image, Text, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import {
  addToCart,
  getCart,
  singleRestaurant,
  singleRestaurantName
} from "../Redux/Reducers/RestaurantReducer/action";
import { FaStar } from "react-icons/fa";

const SingleRestaurant = () => {
  const dispatch = useDispatch();
  const [menu, setMenu] = useState([]);
  const AddTOCartToast = useToast();
  const [singleRestaurantData, setSingleRestaurantData] = useState({});
  const { token } = useSelector((state) => state.userReducer);
  const { restId } = useParams();
  const noUserLoginToast = useToast();

  useEffect(() => {
    dispatch(singleRestaurant(restId)).then((res) => {
      if ((res.type = "GET_MENU_DATA_SUCCESS")) {
        let data = res.payload.menuList;
        setMenu(data);
      }
    });

    dispatch(singleRestaurantName(restId)).then((res) => {
      if ((res.type = "GET_SINGLE_RESTAURANT_NAME_SUCCESS")) {
        let data = res.payload.singleRestaurant;
        setSingleRestaurantData(data);
      }
    });
  }, []);

  const handleAddToCart = (menuId) => {
    dispatch(addToCart(token, menuId)).then((res) => {
      if (res.type === "ADD_TO_CART_SUCCESS") {
        AddTOCartToast({
          title: "Item Added to cart",
          status: "success",
          duration: 2000,
          position: "top-right",
          isClosable: true,
          description: "Please click on bag icon to see your bag"
        });
        dispatch(getCart(token));
      }
    });
  };

  const cuisine = singleRestaurantData?.cuisines?.join(", ");

  return (
    <Box>
      <Navbar />
      <Box bg="#171a29">
        <Box
          display={"flex"}
          flexDirection={{
            base: "column-reverse",
            sm: "column-reverse",
            md: "row"
          }}
          gap={{ base: "20px", sm: "20px", md: "40px", lg: "80px" }}
          p="50px 30px"
          color="white"
          w={{ base: "100%", sm: "100%", md: "100%", lg: "80%" }}
          m="auto"
          justifyContent={"space-evenly"}
        >
          <Box
            w={{ base: "100%", sm: "100%", md: "50%", lg: "60%" }}
            p="20px"
            m={"auto"}
          >
            <Box
              w={{ base: "100%", sm: "70%", md: "100%", lg: "100%" }}
              m={"auto"}
            >
              <Text
                fontSize={"32px"}
                alignItems={"center"}
                fontWeight="400"
                textAlign={"left"}
              >
                {singleRestaurantData.rest_name}
              </Text>
              <Text
                color={"#b1b2b7"}
                fontSize="15px"
                mt="10px"
                textAlign="left"
                height="20px"
                w="80%"
              >
                {cuisine}
              </Text>

              <Text
                color={"#b1b2b7"}
                fontSize="15px"
                mt={{ base: "25px", sm: "25px", md: "25px", lg: "10px" }}
                textAlign={"left"}
              >
                {singleRestaurantData.address}
              </Text>
              <Box
                display={"flex"}
                mt="20px"
                gap={{ md: "30px", lg: "50px" }}
                textAlign="left"
                alignItems={"left"}
                pt="15px"
                w="100%"
              >
                <Box>
                  <Box
                    display={"flex"}
                    justifyContent={"space-evenly"}
                    gap="5px"
                    fontWeight={"600"}
                    p="0px 5px"
                    fontSize={"16px"}
                    alignItems={"center"}
                    color="white"
                  >
                    <Box>
                      <FaStar fontSize={"12px"} />
                    </Box>
                    <Box>
                      <Text>{singleRestaurantData?.rating}</Text>
                    </Box>
                  </Box>

                  <Text
                    color={"#b1b2b7"}
                    alignItems={"center"}
                    fontSize="12px"
                    mt="2px"
                  >
                    Ratings
                  </Text>
                </Box>

                <Box
                  borderLeft="1px solid #b1b2b7"
                  height="40px"
                  ml={"10px"}
                  mr={"10px"}
                ></Box>

                <Box>
                  <Text
                    fontWeight={"600"}
                    fontSize={{ base: "", sm: "", md: "14px", lg: "16px" }}
                  >{`${singleRestaurantData.d_time} MINS`}</Text>

                  <Text
                    color={"#b1b2b7"}
                    alignItems={"center"}
                    fontSize="12px"
                    mt="2px"
                  >
                    Delivery Time
                  </Text>
                </Box>
                <Box
                  borderLeft="1px solid #b1b2b7"
                  height="40px"
                  ml={"10px"}
                  mr={"10px"}
                ></Box>

                <Box>
                  <Text>{`₹${singleRestaurantData.cost}`}</Text>
                  <Text
                    color={"#b1b2b7"}
                    alignItems={"center"}
                    fontSize="12px"
                    mt="2px"
                  >
                    Cost for two
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            w={{ base: "100%", sm: "100%", md: "40%", lg: "40%" }}
            p="20px"
            m={"auto"}
          >
            <Image
              src={singleRestaurantData?.image_rest}
              height="200px"
              w={{ base: "100%", sm: "70%", md: "100%", lg: "100%" }}
              m={"auto"}
              objectFit="fill"
            />
          </Box>
        </Box>
      </Box>

      <Box
        w={{ base: "90%", sm: "80%", md: "65%", lg: "50%" }}
        m="auto"
        h="600px"
        overflowY="scroll"
        borderLeft={"0.3px solid #e0e5e9"}
        mb="30px"
        css={{
          "&::-webkit-scrollbar": {
            width: "4px",
            color: "var(var(--heading_text)"
          },
          "&::-webkit-scrollbar-track": {
            width: "6px"
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#fff",
            borderRadius: "24px"
          }
        }}
      >
        {menu.map((item) => (
          <Box key={item._id} p="20px" position={"relative"}>
            <Box
              display={"flex"}
              alignItems="center"
              textAlign={"left"}
              alignContent="center"
            >
              <Box w="80%">
                <Text fontSize={"20px"} fontWeight="500" color="var(--heading_color)">
                  {item.title}
                </Text>
                <Text>{`₹${item.price}`}</Text>
                <Text
                  w="100%"
                  textOverflow={"ellipsis"}
                  mt="15px"
                  overflow="hidden"
                  color="#9ea0a8"
                  fontSize={{ base: "12px", sm: "12.5px", md: "14px" }}
                >
                  {item.description}
                </Text>
              </Box>
              <Box w="20%" position={"relative"}>
                <Image
                  src={item.item_image}
                  w="100px"
                  height="100px"
                  m="auto"
                  objectFit="cover"
                />
                <Button
                position={"absolute"}
                p="0px 20px 0px 20px"
                bg={"green.500"}
                left="35px"
                bottom="-20px"
                borderRadius={"5px"}
                alignItems="center"
                color={"white"}
                onClick={() => {
                  if (token) handleAddToCart(item._id);
                  else
                    noUserLoginToast({
                      title: "Fail to Add in cart!",
                      description: "Please Signup or login!",
                      status: "error",
                      duration: 4000,
                      isClosable: true,
                      position: "top-right"
                    });
                }}
              >
                Add
              </Button>
              </Box>
            </Box>
            <Box borderBottom={"2px solid #e0e5e9"} mt="30px"></Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SingleRestaurant;
