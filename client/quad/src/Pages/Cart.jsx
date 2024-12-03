import { Box, Button, Flex, Image, Text, useToast } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Components/Navbar";
import axios from "axios";
import {
  deleteFromCart,
  getCart,
  updateQuantity
} from "../Redux/Reducers/RestaurantReducer/action";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const paymentSuccessfull = useToast();
  const paymentFailed = useToast();
  const [restaurant, setRestaurant] = useState({});
  const cart = useSelector((state) => state.restaurantReducer.cart);
  const token = useSelector((state) => state.userReducer.token);

  // const [cart, setCart] =useState([])

  useEffect(() => {
    if (cart.length === 0) {
      dispatch(getCart(token));
    }
  }, [cart.length]);

  let Total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartLength = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleChangeQuantity = (cartId, quantity, value) => {
    const payload = {
      quantity: value
    };

    dispatch(updateQuantity(token, cartId, payload)).then((res) => {
      if (res.type === "UPDATE_ITEM_CART_SUCCESS") {
        dispatch(getCart(token));
      }
    });

    // let updatedData = cart.map((item)=>{
    //     if(item._id === id){
    //       return {
    //         ...item,
    //         quantity : item.quantity + value
    //       }

    //     }
    //     else{
    //         return item
    //     }
    // })
    // // cart = updatedData
    // dispatch(getCart(token))
  };
  useEffect(() => {
    dispatch(getCart(token));
  }, [dispatch]);

  const handlePayment = async () => {
    try {
      const orderUrl = `${process.env.REACT_APP_BASE_URL}/api/payment/orders`;
      const { data } = await axios.post(orderUrl, {
        amount: Total,
        currency: "INR"
      });
      initPayment(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const initPayment = (data) => {
    const options = {
      key: process.env.RAZORPAY_KEY_ID,
      amount: Total,
      currency: data.currency,
      name: "Foodie",
      description: "Test Transaction",
      image: "test",
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl = `${process.env.REACT_APP_BASE_URL}/api/payment/verify`;
          const { data } = await axios.post(verifyUrl, response);
          if (data && data.status && data.status == 1) {
            paymentSuccessfull({
              title: "Payment Successful",
              status: "success",
              duration: 2000,
              position: "top",
              isClosable: true
            });
            navigate("/");
          } else {
            paymentFailed({
              title: "Payment Failure",
              description: "payment has been failed due to some error",
              status: "error",
              duration: 2000,
              position: "top",
              isClosable: true
            });
          }
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc"
      }
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handleRemoveFromCart = (cartId) => {
    dispatch(deleteFromCart(token, cartId)).then((res) => {
      if (res.type === "DELETE_ITEM_CART_SUCCESS") {
        dispatch(getCart(token));
      }
    });
  };

  return (
    <Box w="100%">
      <Navbar />
      {/* cart items */}
      {/* <Box w="70%"></Box> */}
      <Box mb="40px">
        {cart.length === 0 && (
          <Box w="50%" m="auto" alignItems="center">
            <Image
              w="100%"
              h="400px"
              src="https://assets.materialup.com/uploads/66fb8bdf-29db-40a2-996b-60f3192ea7f0/preview.png"
            />
            <Text color={"#b1b2b7"}>
              Looks like you have not added anything to the cart. Go <br />
              ahead and explore Restaurants.
            </Text>
          </Box>
        )}
      </Box>
      <Box
        display={"flex"}
        flexDirection={{ base: "column", sm: "column", md: "row" }}
        m="auto"
        w={{ md: "90%", lg: "80%" }}
        gap={{ md: "10px", lg: "20px" }}
      >
        <Box w={{ base: "80%", sm: "80%", md: "60%" }}>
          {cart?.length > 0 &&
            cart?.map((item) => (
              <Box
                key={item._id}
                bg={"white"}
                mb={"8px"}
                border={"1px solid #e0e5e9"}
                p={"10px"}
              >
                <Flex
                  direction={{ base: "column", sm: "row" }}
                  justifyContent="space-between"
                >
                  <Box w={"200px"} m={{ base: "auto", sm: "px", md: "px" }}>
                    <Image
                      objectFit={"cover"}
                      width="200px"
                      height="100px"
                      src={item.itemImage}
                      alt={"cartPic"}
                    />
                  </Box>

                  <Box w="100%" textAlign={"center"}>
                    <Text
                      fontWeight={"600"}
                      fontSize={{ base: "15px", md: "16px" }}
                      color="#021236"
                      pb="10px"
                    >
                      {item.itemName}
                    </Text>
                    <Text fontWeight={"400"} fontSize={"16px"} pb="5px">
                      ₹ {item.price}
                    </Text>
                  </Box>
                  <Box pl={"15px"}>
                    <Flex justifyContent={"center"}>
                      <Flex
                        alignItems={"center"}
                        textAlign="center"
                        gap={"15px"}
                        w={{ base: "50", sm: "50%", md: "100%" }}
                        m="auto"
                      >
                        <Text fontWeight={"480"} fontSize={"16px"}>
                          Quantity:
                        </Text>
                        <Button
                          size={"xs"}
                          fontWeight={"700"}
                          fontSize={"14px"}
                          disabled={item.quantity === 1}
                          onClick={() =>
                            handleChangeQuantity(item._id, item.quantity, -1)
                          }
                        >
                          -
                        </Button>
                        <Text
                          fontWeight={"500"}
                          fontSize={"13.5px"}
                          pl={"5px"}
                          pr={"5px"}
                        >
                          {item.quantity}
                        </Text>
                        <Button
                          size={"xs"}
                          fontWeight={"700"}
                          fontSize={"14px"}
                          onClick={() =>
                            handleChangeQuantity(item._id, item.quantity, 1)
                          }
                        >
                          +
                        </Button>
                      </Flex>
                    </Flex>

                    <Box pt="20px">
                      <Button
                        fontSize={"12px"}
                        variant={"unstyled"}
                        size={{ base: "xs", sm: "sm" }}
                        w={{ base: "50%", md: "60%" }}
                        display="block"
                        color="white"
                        margin={"auto"}
                        bg={"green.500"}
                        onClick={() => handleRemoveFromCart(item._id)}
                      >
                        Remove
                      </Button>
                    </Box>
                  </Box>
                </Flex>
              </Box>
            ))}
        </Box>
        {/* total price box */}
        <Box
          w={{ base: "80%", sm: "80%", md: "40%" }}
          display={cart.length === 0 ? "none" : "block"}
        >
          <Flex
            justifyContent={"space-between"}
            pt={"20px"}
            mb={"40px"}
            pl={"20px"}
            alignItems={"center"}
          >
            <Text fontSize={"14px"} fontWeight={"600"}>
              Price ({cartLength} Items.)
            </Text>
            <Text fontSize={"14px"} fontWeight={"600"}>
              ₹ {Total}
            </Text>
          </Flex>
          <Flex
            justifyContent={"space-between"}
            mt={"10px"}
            mb={"40px"}
            pl={"20px"}
            alignItems={"center"}
          >
            <Text fontSize={"14px"} fontWeight={"600"}>
              Discount
            </Text>
            <Text fontSize={"14px"} fontWeight={"600"}>
              0.00
            </Text>
          </Flex>
          <Flex
            justifyContent={"space-between"}
            mt={"10px"}
            mb={"40px"}
            pl={"20px"}
            alignItems={"center"}
          >
            <Text fontSize={"14px"} fontWeight={"600"}>
              Delivery Charges
            </Text>
            <Text fontSize={"14px"} fontWeight={"600"} color={"green.400"}>
              Free
            </Text>
          </Flex>
          <Flex
            justifyContent={"space-between"}
            pb={"20px"}
            mt={"10px"}
            mb={"40px"}
            pl={"20px"}
            alignItems={"center"}
          >
            <Text fontSize={"17px"} fontWeight={"640"}>
              Total Payable Amount
            </Text>
            <Text fontSize={"17px"} fontWeight={"640"}>
              ₹ {Total}
            </Text>
          </Flex>
          <Flex
            justifyContent={"center"}
            pb={"20px"}
            mt={"10px"}
            mb={"40px"}
            pl={"20px"}
            alignItems={"center"}
          >
            <Button
              fontSize={"12px"}
              variant={"unstyled"}
              size={{ base: "xs", sm: "sm" }}
              w={{ base: "100%", md: "100%" }}
              display="block"
              h={{ base: "50px", md: "40px" }}
              color="white"
              margin={"auto"}
              bg={"green.500"}
              onClick={handlePayment}
            >
              Pay ₹ {Total}
            </Button>
          </Flex>
        </Box>
        {/* <Box></Box> */}
      </Box>
    </Box>
  );
};

export default Cart;
