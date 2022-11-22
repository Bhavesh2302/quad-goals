import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFromCart,
  getCart,
} from "../Redux/Reducers/RestaurantReducer/action";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.restaurantReducer.cart);

  // const [cart, setCart] =useState([])

  useEffect(() => {
    if (cart.length === 0) {
      dispatch(getCart()).then((res) => {
        if (res.type === "GET_CART_SUCCESS") {
          console.log("getData", res);
          //    setCart(res.payload.cartData)
        }
      });
    }
  }, [cart.length]);

  const handleChangeQuantity = (id, quantity, value) => {};
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const handleRemoveFromCart = (cartId) => {
    dispatch(deleteFromCart(cartId)).then((res) => {
      console.log(res);
      if (res.type === "DELETE_ITEM_CART_SUCCESS") {
        console.log("hello");
        dispatch(getCart());
      }
    });
  };

  return (
    <Box w="100%">
      {/* cart items */}
      <Box w="70%"></Box>
      <Box display={"flex"}>
        <Box w="60%">
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
                  <Box pl={"15px"} textAlign={"left"}>
                    <Flex alignItems={"center"} gap={"15px"} w="50%">
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
        <Box></Box>
      </Box>
    </Box>
  );
};

export default Cart;
