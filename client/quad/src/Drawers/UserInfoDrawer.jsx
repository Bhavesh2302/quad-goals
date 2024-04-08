import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  useToast,
  Flex,
  Box,
  Text
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../Redux/Reducers/UserAuthReducer/action";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GiMeal } from "react-icons/gi";
import { FaUserCog } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";

const UserInfoDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const dispatch = useDispatch();
  const logoutToast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { userData } = useSelector((state) => state.userReducer);

  const handleLogout = () => {
    dispatch(userLogout());
    navigate("/");
    logoutToast({
      title: "Logout successfully",
      status: "success",
      isClosable: true,
      duration: 2000,
      position: "top"
    });
  };


  return (
    <>
      <Button
        ref={btnRef}
        variant={"unstyled"}
        onClick={onOpen}
        fontWeight="650"
        size={"md"}
        fontSize={
          location?.pathname === "/"
            ? { base: "12px", sm: "15px", md: "16px", lg: "18px" }
            : { base: "12px", sm: "15px" }
        }
        _hover={{ color: "red", cursor: "pointer" }}
      >
        <Flex
          alignItems={"center"}
          gap={{ base: "5px", sm: "5px", md: "5px", lg: "10px" }}
        >
          <Box
            w="24px"
            h="24px"
            borderRadius="50%"
            border="1px solid"
            display="flex"
            justifyContent="center"
            alignItems="center"
            color="white"
            bg="pink.600"
            fontSize="12px"
            fontWeight="550"
          >
            {userData?.name[0]}
          </Box>
          <Box>{userData?.name?.trim().split(" ")[0]}</Box>
        </Flex>
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader
            h="60px"
            bg="#c2d6ab"
            display="flex"
            alignItems="center"
            justifyContent="start"
            flexWrap="wrap"
            gap="10px"
            fontSize="20px"
            fontWeight="700"
          >
            <Box color="#fff">Hi</Box>
            <Box>{userData?.name?.trim().split(" ")[0]}</Box>
          </DrawerHeader>
          <DrawerBody
            pl={{ base: "20px", sm: "25px", md: "27px" }}
            pt="25px"
            display="flex"
            flexDirection="column"
            gap={{ base: "25px", sm: "35px", md: "35px" }}
          >
            {userData?.role === "customer" && (
              <Flex
                alignItems={"center"}
                gap={"10px"}
                _hover={{ color: "red", cursor: "pointer" }}
                fontSize={{ base: "12px", sm: "12px", md: "15px" }}
                onClick={() => navigate("/")}
              >
                <GiMeal />
                <Text fontWeight={"650"}>My Orders</Text>
              </Flex>
            )}
            <Flex
              alignItems={"center"}
              gap={"10px"}
              _hover={{ color: "red", cursor: "pointer" }}
              fontSize={{ base: "12px", sm: "12px", md: "15px" }}
            >
              <FaUserCog />
              <Text fontWeight={"650"}>My Account</Text>
            </Flex>
            {userData?.role === "shopOwner" && (
              <Flex
                alignItems={"center"}
                gap={"10px"}
                _hover={{ color: "red", cursor: "pointer" }}
                fontSize={{ base: "12px", sm: "12px", md: "15px" }}
              >
                <MdDashboard />
                <Link to="/shopownerdashboard">
                  <Text fontWeight={"650"}>My Dashboard</Text>
                </Link>
              </Flex>
            )}
            <Flex
              alignItems={"center"}
              gap={"10px"}
              _hover={{ color: "red", cursor: "pointer" }}
              fontSize={{ base: "12px", sm: "12px", md: "15px" }}
              onClick={handleLogout}
            >
              <IoMdLogOut />
              <Text fontWeight={"650"}>Logout</Text>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default UserInfoDrawer;
