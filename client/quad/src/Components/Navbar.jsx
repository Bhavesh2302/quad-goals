import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Image,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import React, { useRef } from "react";
import Login from "../Pages/Login";
import LocationSearch from "./LocationSearch";
import { FaUserAlt } from "react-icons/fa";
import {
  MdHelp,
  MdLocalOffer,
  MdManageAccounts,
  MdHomeFilled
} from "react-icons/md";
import { BsFillHandbagFill } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import UserInfo from "../Drawers/UserInfoDrawer";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.userReducer);
  const location = useLocation();
  const { userData } = useSelector((state) => state.userReducer);

  return (
    <Flex
      h={"80px"}
      p={"10px"}
      justifyContent={{ base: "space-between", sm: "", md: "space-between" }}
      alignItems={"center"}
      w={{
        base: "95%",
        sm: "90%",
        md: "90%",
        lg: location?.pathname === "/" ? "70%" : "88%"
      }}
      m={"auto"}
      gap={{ base: "5px", sm: "5px", md: "100px" }}
      fontSize={{ base: "12px", sm: "15px", md: "16px", lg: "18px" }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={{ base: "15px", sm: "15px", md: "25px" }}
        w="auto"
      >
        <Link to={"/"}>
          <Image
            w={{
              base: "80px",
              sm: "90px",
              md: location?.pathname === "/" ? "120px" : "155px",
              lg: location?.pathname === "/" ? "160px" : "155px"
            }}
            h={{
              base: "40px",
              sm: "40px",
              md: location?.pathname === "/" ? "70px" : "60px",
              lg: location?.pathname === "/" ? "90px" : "65px"
            }}
            src={"https://i.imgur.com/Gex3smL.jpg"}
            alt={"logo"}
          />
        </Link>
        {location.pathname !== "/" && <LocationSearch />}
      </Box>
      <Box
        display={{ base: "none", sm: "none", md: "none", lg: "flex" }}
        w="auto"
        direction="row"
        justifyContent={{
          base: "flex-end",
          sm: "flex-end",
          md: "flex-end",
          lg: "space-around"
        }}
        gap={{
          base: "5px",
          sm: "5px",
          md: "5px",
          lg: "64px"
        }}
        alignItems="center"
      >
        <Flex
          alignItems={"center"}
          gap={"10px"}
          _hover={{ color: "red", cursor: "pointer" }}
        >
          <MdLocalOffer fontSize="20px" />
          <Text fontWeight={"650"}>Offers</Text>
        </Flex>
        <Flex
          alignItems={"center"}
          gap={"10px"}
          _hover={{ color: "red", cursor: "pointer" }}
        >
          <MdHelp fontSize="20px" />
          <Text fontWeight={"650"}>Help</Text>
        </Flex>
        {token === null ? (
          <Flex
            alignItems={"center"}
            gap={"10px"}
            _hover={{ color: "red", cursor: "pointer" }}
          >
            <FaUserAlt fontSize="20px" />
            <Login />
          </Flex>
        ) : (
          <UserInfo />
        )}
        <Flex
          alignItems={"center"}
          gap={"10px"}
          _hover={{ color: "red", cursor: "pointer" }}
          onClick={() => navigate("/cart")}
        >
          <BsFillHandbagFill fontSize="20px" />
          <Text fontWeight={"650"}>Bag</Text>
        </Flex>
      </Box>
      <Flex
        display={{ base: "flex", sm: "flex", md: "flex", lg: "none" }}
        w={{ base: "70%", sm: "70%", md: "70%" }}
        gap={"5px"}
        justifyContent={"flex-end"}
      >
        {token === null ? (
          <Flex
            alignItems={"center"}
            gap={"1px"}
            _hover={{ color: "red", cursor: "pointer" }}
          >
            <FaUserAlt fontSize={{ base: "12px", sm: "12px", md: "15px" }} />
            <Login />
          </Flex>
        ) : (
          <UserInfo />
        )}
        <Button
          ref={btnRef}
          fontWeight={"650"}
          variant={"unstyled"}
          border={"0px"}
          color={"black"}
          borderRadius={"0px"}
          fontSize={
            location?.pathname === "/"
              ? { base: "11px", sm: "11px", md: "16px", lg: "18px" }
              : { base: "12px", sm: "15px", md: "15px", lg: "15px" }
          }
          _hover={{ color: "red", cursor: "pointer" }}
          onClick={onOpen}
        >
          <HamburgerIcon />
        </Button>
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
          size={{ base: "xs", sm: "xs", md: "xs", lg: "xs" }}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader
              pl={{ base: "20px", sm: "25px", md: "27px" }}
              bg="#c2d6ab"
            >
              <Flex
                fontSize={{ base: "12px", sm: "15px", md: "18px" }}
                alignItems="center"
                justifyContent="flex-start"
                gap="10px"
                fontWeight="650"
              >
                <Text
                  fontSize={{ base: "16px", sm: "18px", md: "24px" }}
                  color="white"
                >
                  Hi
                </Text>
                <Text color={"#646464"} mt="5px">
                  {token ? userData?.name : "there"}
                </Text>
              </Flex>
            </DrawerHeader>
            <DrawerBody
              pl={{ base: "20px", sm: "25px", md: "27px" }}
              pt="25px"
              display="flex"
              flexDirection="column"
              gap={{ base: "25px", sm: "35px", md: "35px" }}
            >
              <Flex
                alignItems={"center"}
                gap={"10px"}
                _hover={{ color: "red", cursor: "pointer" }}
                fontSize={{ base: "12px", sm: "12px", md: "15px" }}
                onClick={() => {
                  navigate("/");
                }}
              >
                <MdHomeFilled />
                <Text fontWeight={"650"}>Home</Text>
              </Flex>
              <Flex
                alignItems={"center"}
                gap={"10px"}
                _hover={{ color: "red", cursor: "pointer" }}
                fontSize={{ base: "12px", sm: "12px", md: "15px" }}
              >
                <MdLocalOffer />
                <Text fontWeight={"650"}>Offers</Text>
              </Flex>
              <Flex
                alignItems={"center"}
                gap={"10px"}
                _hover={{ color: "red", cursor: "pointer" }}
                fontSize={{ base: "12px", sm: "12px", md: "15px" }}
              >
                <MdHelp />
                <Text fontWeight={"650"}>Help</Text>
              </Flex>
              <Flex
                alignItems={"center"}
                gap={"10px"}
                _hover={{ color: "red", cursor: "pointer" }}
                fontSize={{ base: "12px", sm: "12px", md: "15px" }}
                onClick={() => {
                  navigate("/cart");
                }}
              >
                <BsFillHandbagFill />
                <Text fontWeight={"650"}>Bag</Text>
              </Flex>
              <Flex
                alignItems={"center"}
                gap={"10px"}
                _hover={{ color: "red", cursor: "pointer" }}
                fontSize={{ base: "12px", sm: "12px", md: "15px" }}
              >
                <MdManageAccounts />
                <Text fontWeight={"650"}>My Account</Text>
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    </Flex>
  );
};

export default Navbar;
