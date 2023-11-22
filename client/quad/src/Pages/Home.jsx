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

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, userData } = useSelector((state) => state.userReducer);
  const strings = [
    "Hungry?",
    "Unexpected Guest?",
    "Cooking gone Wrong?",
    "Late Night at office?"
  ];
  const [currentString, setCurrentString] = useState("");
  const [timer, settimer] = useState(0);
  const timerId = useRef(null);
  const { isOpen, onToggle } = useDisclosure();
  const [city, setCity] = useState("");

  useEffect(() => {
    if (!timerId.current) {
      let id = setInterval(() => {
        settimer((prev) => prev + 1);
        setCurrentString(strings[timer]);
        onToggle();
      }, 2000);

      timerId.current = id;
    }

    return () => {
      clearInterval(timerId.current);
      timerId.current = null;
      if (timer === strings.length) {
        setCurrentString("Game Night?");
        settimer(0);
      }
    };
  }, [timerId?.current]);

  const handleSearchByCity = () => {
    dispatch(getRestaurantsByCity(city)).then((res) => {
      if (res.type === "GET_RESTAURANTS_BY_CITY_SUCCESS")
        navigate(`/allrestaurants/${city}`);
    });
  };

  return (
    <Box w="100%">
      <Box
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
                h={{ base: "70px", sm: "70px", md: "90px", lg: "105px" }}
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
          <Flex mt={"23px"}>
            <Input
              onChange={(e) => setCity(e.target.value)}
              border={"2px solid #969491"}
              h={{ base: "40px", sm: "40px", md: "40px", lg: "50px" }}
              borderRadius={"0px"}
              placeholder={"Enter your delivery location"}
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
      </Box>
      <OrderDeliveryTrackingComponent />
      <BannerAppStore />
    </Box>
  );
};

export default Home;
