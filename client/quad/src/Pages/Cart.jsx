import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Components/Navbar";
import {
  deleteFromCart,
  getCart,
  updateQuantity,
} from "../Redux/Reducers/RestaurantReducer/action";


const Cart = () => {
  const dispatch = useDispatch();
  const [restaurant, setRestaurant] =useState({})  
  const cart = useSelector((state) => state.restaurantReducer.cart);
  const token = useSelector((state)=>state.userReducer.token)

  // const [cart, setCart] =useState([])

  useEffect(() => {
    if (cart.length === 0) {
      dispatch(getCart(token))
    }
  }, [cart.length]);

  const Total = cart.reduce((acc, item)=> acc + (item.price * item.quantity), 0)
  console.log("total",Total)
  const cartLength = cart.reduce((acc, item)=> acc + (item.quantity), 0)
  console.log("cartLength",cartLength)

  const handleChangeQuantity = (cartId,quantity,value) => {
    const payload ={
        quantity : value
    }

    dispatch(updateQuantity(token,cartId,payload))
    .then((res)=>{
        if(res.type === "UPDATE_ITEM_CART_SUCCESS"){
            dispatch(getCart(token))
        }
    })

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
    // console.log("updated data",updatedData)


  };
  useEffect(() => {
    dispatch(getCart(token));
  }, [dispatch]);

  const handleRemoveFromCart = (cartId) => {
    dispatch(deleteFromCart(token,cartId)).then((res) => {
      console.log(res);
      if (res.type === "DELETE_ITEM_CART_SUCCESS") {
        console.log("hello");
        dispatch(getCart(token));
      }
    });
  };

  return (
    <Box w="100%">
        <Navbar/>
      {/* cart items */}
      {/* <Box w="70%"></Box> */}
      <Box mb="40px">
      {
            cart.length === 0 && <Box w="50%" m="auto"alignItems="center">
                
                <Image w="100%" h="400px"src="https://assets.materialup.com/uploads/66fb8bdf-29db-40a2-996b-60f3192ea7f0/preview.png"/>
                <Text color={"#b1b2b7"}>Looks like you have not added anything to the cart. Go <br />
                ahead and explore Restaurants.
                </Text>
            </Box>
        }
      </Box>
      <Box display={"flex"} flexDirection={{base:"column",sm:"column",md:"row"}} m="auto" w={{md:"90%",lg:"80%"}}  gap={{md:"10px",lg:"20px"}}>
        <Box w={{base : "80%",sm:"80%",md:"60%"}} m="auto">
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
                  <Box pl={"15px"} >
                        <Flex justifyContent={"center"}>
                    <Flex alignItems={"center"} textAlign="center"gap={"15px"} w={{base:"50",sm:"50%",md:"100%"}} m="auto">
                      <Text fontWeight={"480"} fontSize={"16px"}>
                        Quantity:
                      </Text>
                      <Button
                        size={"xs"}
                        fontWeight={"700"}
                        fontSize={"14px"}
                        disabled={item.quantity === 1}
                        onClick={() =>
                          handleChangeQuantity(item._id,item.quantity, -1)
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
                          handleChangeQuantity(item._id, item.quantity,1)
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
        <Box w={{base : "80%",sm:"80%",md:"40%"}} display={cart.length===0 ? "none" : "block"}>
                              <Flex justifyContent={"space-between"} pt={"20px"} mb={"40px"} pl={"20px"}  alignItems={"center"}>
                                  <Text fontSize={"14px"} fontWeight={"600"}>Price ({cartLength} Items.)</Text>
                                  <Text fontSize={"14px"} fontWeight={"600"}>₹ {Total}</Text>
                              </Flex>
                            <Flex justifyContent={"space-between"} mt={"10px"} mb={"40px"} pl={"20px"}  alignItems={"center"}>
                                  <Text fontSize={"14px"} fontWeight={"600"}>Discount</Text>
                                  <Text fontSize={"14px"} fontWeight={"600"}>0.00</Text>
                            </Flex>
                            <Flex justifyContent={"space-between"} mt={"10px"} mb={"40px"} pl={"20px"}  alignItems={"center"}>
                                  <Text fontSize={"14px"} fontWeight={"600"}>Delivery Charges</Text>
                                  <Text fontSize={"14px"} fontWeight={"600"} color={"green.400"}>Free</Text>
                            </Flex>
                            <Flex justifyContent={"space-between"} pb={"20px"} mt={"10px"} mb={"40px"} pl={"20px"}  alignItems={"center"}>
                                  <Text fontSize={"17px"} fontWeight={"640"}>Total Payable Amount</Text>
                                  <Text fontSize={"17px"} fontWeight={"640"}>₹ {Total}</Text>
                            </Flex>
                        </Box>
        {/* <Box></Box> */}
      </Box>
    </Box>
  );
};

export default Cart;
