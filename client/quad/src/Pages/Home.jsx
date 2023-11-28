import {
  Box,
  Image,
  Flex,
  Button,
  Text,
  Input,
  SlideFade,
  useDisclosure
} from "@chakra-ui/react";
import React from "react";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import BannerAppStore from "../Components/BannerAppStore";
import OrderDeliveryTrackingComponent from "../Components/OrderDeliveryTrackingComponent";
import UserInfo from "../Components/UserInfo";
import { getRestaurantsByCity } from "../Redux/Reducers/RestaurantReducer/action";
import Login from "./Login";
import Signup from "./Signup";
import HomeNavbar from "../Components/HomeNavbar";
import { MdOutlineMyLocation, MdOutlineClose } from "react-icons/md";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, userData } = useSelector((state) => state.userReducer);
  const strings = [
    "Starving?",
    "",
    "Spontaneous guest?",
    "",
    "Cooking didn't turn out?",
    "",
    "After-hours at work?",
    "",
    "Game Night?"
  ];
  const [currentString, setCurrentString] = useState("");
  const [timer, settimer] = useState(0);
  const timerId = useRef(null);
  const { isOpen, onToggle } = useDisclosure();
  const [city, setCity] = useState("");
  const cityRef = useRef(null);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (!timerId.current) {
      let id = setInterval(() => {
        setCurrentString(strings[timer]);
        onToggle();
        settimer((prev) => prev + 1);
      }, 2000);

      timerId.current = id;
    }

    return () => {
      clearInterval(timerId.current);
      timerId.current = null;
      if (timer === strings.length) {
        setCurrentString("");
        settimer(0);
      }
    };
  }, [timerId?.current]);

  const handleSearchByCity = (e) => {
    e.preventDefault();
    if (city !== "") {
      dispatch(getRestaurantsByCity(city)).then((res) => {
        if (res.type === "GET_RESTAURANTS_BY_CITY_SUCCESS")
          navigate(`/allrestaurants/${city}`);
      });
    } else {
      cityRef.current.focus();
      setShowMessage(true);
    }
  };
  console.log(currentString, timer);

  return (
    <Box w="100%">
      <Box
        h={{ base: "400px", sm: "500px", md: "600px", lg: "700px" }}
        w="100%"
        display="flex"
        justifyContent="space-between"
        color="white"
        position="relative"
        overflow="hidden"
      >
        <Box
          zIndex="1"
          position="absolute"
          w="100%"
          color="black"
          pt={{ base: "10px", sm: "10px", md: "30px", lg: "30px" }}
        >
          <HomeNavbar />
        </Box>
        <Box
          position="absolute"
          bg="#c2d6ab"
          h={{ base: "570px", sm: "900px", md: "900px", lg: "900px" }}
          zIndex="-1"
          w={{ base: "35%", sm: "35%", md: "40%", lg: "45%" }}
          top="-14%"
          right={{ base: "-20%", sm: "-20%", md: "-17%", lg: "-17%" }}
          borderLeftRadius="50%"
        ></Box>
        <Box
          w={{ base: "95%", sm: "95%", md: "95%", lg: "70%" }}
          position="absolute"
          zIndex="1"
          top={{ base: "-15px", sm: "-20px", md: "100px", lg: "100px" }}
          left={{ base: "10%", sm: "10%", md: "10%", lg: "16%" }}
          pr={{ base: "250px", sm: "250px", md: "250px", lg: "250px" }}
          mt="200px"
        >
          <Box
            textAlign={"left"}
            position="absolute"
            zIndex="3"
            bottom={{ base: "60px", sm: "60px", md: "80px", lg: "90px" }}
          >
            <SlideFade
              slideFade
              in={isOpen}
              offsetY="20px"
              unmountOnExit={true}
            >
              <Text
                fontSize={{ base: "20px", sm: "20px", md: "30px", lg: "40px" }}
                fontWeight={"bold"}
                mb={"12px"}
                color="black"
              >
                {currentString}
              </Text>
            </SlideFade>
            <Box
              fontSize={{ base: "10px", sm: "10px", md: "15px", lg: "18px" }}
              fontWeight={"bold"}
              color={"gray"}
            >
              <Text>Order your favourite food from restaurants near you.</Text>
            </Box>
          </Box>
          <form onSubmit={handleSearchByCity}>
            <Flex
              mt={{ base: "15px", sm: "15px", md: "20px", lg: "23px" }}
              position="relative"
              w={{ base: "250px", sm: "250px", md: "80%", lg: "80%" }}
              fontSize={{ base: "10px", sm: "10px", md: "14px", lg: "14px" }}
            >
              <Input
                onChange={(e) => {
                  setCity(e.target.value);
                  setShowMessage(false);
                }}
                border={"2px solid #969491"}
                h={{ base: "30px", sm: "30px", md: "40px", lg: "50px" }}
                borderRadius={"0px"}
                placeholder={"Enter your delivery location"}
                _focusVisible={{ outline: "none" }}
                ref={cityRef}
                color="black"
                value={city}
                fontSize={{ base: "10px", sm: "10px", md: "14px", lg: "14px" }}
              />
              <Flex
                position="absolute"
                zIndex="3"
                h={{ base: "30px", sm: "30px", md: "40px", lg: "50px" }}
                color="black"
                alignItems="center"
                justifyContent="center"
                right={{ base: "75px", sm: "75px", md: "110px", lg: "110px" }}
              >
                {city === "" ? (
                  <MdOutlineMyLocation />
                ) : (
                  <MdOutlineClose
                    cursor="pointer"
                    onClick={() => setCity("")}
                  />
                )}
              </Flex>
              <Button
                type="submit"
                h={{ base: "30px", sm: "0px", md: "40px", lg: "50px" }}
                borderRadius={"0px"}
                color={"white"}
                bg={"#ef234b "}
                fontSize={{ base: "10px", sm: "10px", md: "14px", lg: "14px" }}
              >
                Find Food
              </Button>
              {showMessage && (
                <Box
                  top="60px"
                  zIndex={2}
                  position="absolute"
                  bg={"yellow.200"}
                  fontWeight="550"
                  w="50%"
                  p="10px"
                  borderRadius="8px"
                >
                  Please Enter a city
                </Box>
              )}
            </Flex>
          </form>
        </Box>
        <Box
          w={{ base: "100px", sm: "150px", md: "200px", lg: "350px" }}
          h={{ base: "100px", sm: "150px", md: "200px", lg: "350px" }}
          borderRadius="50%"
          top={{ base: "140px", sm: "240px", md: "210px", lg: "150px" }}
          p="5px"
          zIndex="1"
          right={{ base: "5%", sm: "5%", md: "12%", lg: "12%" }}
          position="absolute"
          border="5px solid #c2d6ab"
          bg="white"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Image
            src="/Images/Indian-Thali--preview.png"
            h="100%"
            w="100%"
            borderRadius="50%"
            objectFit="cover"
            // animation="dish-spin 15s linear infinite"
          />
        </Box>
        <Box
          zIndex="1"
          position="absolute"
          transform={"rotate(270deg)"}
          w={{ base: "150px", sm: "150px", md: "180px", lg: "270px" }}
          h="auto"
          bottom="-70px"
          left="0"
        >
          <Image w="100%" h="100%" src="/Images/idli_sambar.png" />
        </Box>
      </Box>
      <Box bg="black" h="40px" w="100%" mb="20px"></Box>
      {/* <Box
        display={{ base: "block", sm: "block", md: "block", lg: "flex" }}
        w={"100%"}
        m={"auto"}
        justifyContent={"center"}
      >
        <Box
          w={{ base: "90%", sm: "90%", md: "90%", lg: "52%" }}
          pl={{ base: "50px", sm: "50px", md: "100px", lg: "150px" }}
          pt={"50px"}
          pr={{ base: "0px", sm: "10px", md: "20px", lg: "40px" }}
        >
          <Flex
            alignItems={"center"}
            justifyContent={"space-between"}
            p={"0px"}
          >
            <Box w={{ base: "100px", sm: "100px", md: "140px", lg: "155px" }}>
              <Image
                objectFit={"fill"}
                h={{ base: "70px", sm: "70px", md: {{ base: "10%", sm: "10%", md: "10%", lg: "16%" }}, lg: "105px" }}
                w={"100%"}
                borderRadius={"50%"}
                src={"https://i.imgur.com/Gex3smL.jpg"}
                alt={"Logo"}
              />
            </Box>

            {token === null ? (
              <Flex gap={"15px"}>
                <Login />
                <Signup />
              </Flex>
            ) : (
              <UserInfo />
            )}
          </Flex>
          <Flex pb={"10px"} justifyContent={"flex-end"} mb={"30px"}>
            {userData?.role === "shopOwner" && token ? (
              <Link to={"/shopownerdashboard"}>
                <Text
                  fontSize={{
                    base: "12px",
                    sm: "12px",
                    md: "15px",
                    lg: "18px"
                  }}
                  fontWeight={"550"}
                >
                  See Your Dashboard
                </Text>
              </Link>
            ) : (
              <Link to={"/restownersignup"}>
                <Text
                  fontSize={{
                    base: "12px",
                    sm: "12px",
                    md: "15px",
                    lg: "18px"
                  }}
                  fontWeight={"550"}
                >
                  Want to be a partner?
                </Text>
              </Link>
            )}
          </Flex>
          <Box textAlign={"left"}>
            <SlideFade slideFade in={isOpen} offsetY="20px">
              <Text
                fontSize={{ base: "25px", sm: "25px", md: "30px", lg: "40px" }}
                fontWeight={"bold"}
                mb={"12px"}
              >
                {currentString}
              </Text>
            </SlideFade>
            <Box
              fontSize={{ base: "12px", sm: "12px", md: "15px", lg: "18px" }}
              fontWeight={"bold"}
              color={"gray"}
            >
              <Text>Order food from favourite restaurants near you.</Text>
            </Box>
          </Box>
          <Flex mt={"23px"} position="relative">
            <Input
              onChange={(e) => {
                setCity(e.target.value);
                setShowMessage(false);
              }}
              border={"2px solid #969491"}
              h={{ base: "40px", sm: "40px", md: "40px", lg: "50px" }}
              borderRadius={"0px"}
              placeholder={"Enter your delivery location"}
              ref={cityRef}
            />
            <Button
              onClick={handleSearchByCity}
              h={{ base: "40px", sm: "40px", md: "40px", lg: "50px" }}
              borderRadius={"0px"}
              color={"white"}
              bg={"#ef234b "}
            >
              Find Food
            </Button>
            {showMessage && (
              <Box
                top="60px"
                zIndex={2}
                position="absolute"
                bg={"yellow.200"}
                fontWeight="550"
                fontSize="14px"
                w="50%"
                p="10px"
                borderRadius="8px"
              >
                Please Enter a city
              </Box>
            )}
          </Flex>

          <Box textAlign={"left"} mt={"20px"} mb={"20px"}>
            <Text
              fontSize={"16px"}
              color={"gray"}
              fontWeight={"500"}
              mb={"12px"}
            >
              Popular cities in India
            </Text>
            <Flex
              gap={"10px"}
              fontSize={"15px"}
              fontWeight={"500"}
              flexWrap={"wrap"}
            >
              <Text color={"#bdb3b6"}>Mumbai</Text>
              <Text color={"#969491"}>Delhi</Text>
              <Text color={"#bdb3b6"}>Gurgaon</Text>
              <Text color={"#969491"}>Pune</Text>
              <Text color={"#bdb3b6"}>Kolkata</Text>
              <Text color={"#969491"}>Hyderabad</Text>
              <Text color={"#bdb3b6"}>Chennai</Text>
              <Text color={"#969491"}>Bangalore</Text>
              <Text color={"#969491"}>& more.</Text>
            </Flex>
          </Box>
        </Box>
        <Box
          display={{ base: "none", sm: "none", md: "none", lg: "block" }}
          w={{ base: "0", lg: "48%" }}
        >
          <Image src={"/brooke-lark-HlNcigvUi4Q-unsplash.jpg"} alt={"cover"} />
        </Box>
      </Box> */}
      {/* <OrderDeliveryTrackingComponent /> */}
      {/* <BannerAppStore /> */}
    </Box>
  );
};

export default Home;
