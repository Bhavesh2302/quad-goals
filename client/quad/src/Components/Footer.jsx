import React from "react";
import { Box, Text, Image, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box w={"100%"} bg={"black"} m={"auto"} alignItems={"center"}>
      <Flex
        w={{ base: "95%", sm: "95%", md: "85%", lg: "78%" }}
        m={"auto"}
        alignItems={"center"}
        justifyContent={"space-evenly"}
        fontSize={{ base: "10px", sm: "12px", md: "14px", lg: "16px" }}
        color={"white"}
        pt={"30px"}
      >
        <Box
          w={"28%"}
          display={"flex"}
          flexDirection={"column"}
          pl={"0px"}
          fontWeight={"500"}
          justifyContent={"flex-start"}
          m={"auto"}
          h={"450px"}
          mt={"40px"}
          textAlign={"left"}
        >
          <Text color={"#808080"} mb={"18px"}>
            COMPANY
          </Text>
          <Text mb={"12px"}>About us</Text>
          <Text mb={"12px"}>Teams</Text>
          <Text mb={"12px"}>Foodie Blog</Text>
          <Text mb={"12px"}>Bug Bounty</Text>
          <Text mb={"12px"}>Foodie One</Text>
          <Text mb={"12px"}>Foodie Corporate</Text>
          <Text mb={"12px"}>Foodie Instamart</Text>
        </Box>
        <Box
          w={"28%"}
          display={"flex"}
          flexDirection={"column"}
          pl={"0px"}
          fontWeight={"500"}
          justifyContent={"flex-start"}
          m={"auto"}
          h={"450px"}
          mt={"40px"}
          textAlign={"left"}
        >
          <Text color={"#808080"} mb={"18px"}>
            CONTACT
          </Text>
          <Text mb={"12px"}>Help & Support</Text>
          <Link to={"/restownersignup"}>
            <Text mb={"12px"}>Partner with us</Text>
          </Link>
          <Text mb={"12px"}>Ride with us</Text>
        </Box>
        <Box
          w={"28%"}
          display={"flex"}
          flexDirection={"column"}
          pl={"0px"}
          fontWeight={"500"}
          justifyContent={"flex-start"}
          m={"auto"}
          h={"450px"}
          mt={"40px"}
          textAlign={"left"}
        >
          <Text color={"#808080"} mb={"18px"}>
            LEGAL
          </Text>
          <Text mb={"12px"}>Terms & Conditions</Text>
          <Text mb={"12px"}>Refund & Cancellation</Text>
          <Text mb={"12px"}>Privacy Policy</Text>
          <Text mb={"12px"}>Cookie Policy</Text>
          <Text mb={"12px"}>Offer Terms</Text>
          <Text mb={"12px"}>Phishing & Fraud</Text>
          <Text mb={"12px"}>
            Corporate - Foodie Money Codes Terms and Conditions
          </Text>
          <Text mb={"12px"}>
            Corporate - Foodie Discount Voucher Terms and Conditions
          </Text>
        </Box>
        <Box
          w={"16%"}
          display={"flex"}
          flexDirection={"column"}
          h={"450px"}
          pt={"20px"}
          gap={"20px"}
          pl={"0px"}
          alignItems={"center"}
          justifyContent={"flex-start"}
          m={"auto"}
        >
          <Image
            src={
              "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200,h_65/icon-AppStore_lg30tv"
            }
            alt={"appleStore"}
          />
          <Image
            src={
              "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200,h_65/icon-GooglePlay_1_zixjxl"
            }
            alt={"playStore"}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default Footer;
