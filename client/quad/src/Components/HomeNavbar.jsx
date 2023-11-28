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
import React from "react";
import Login from "../Pages/Login";
import LocationSearch from "./LocationSearch";
import { FaUserAlt } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { MdHelp, MdLocalOffer } from "react-icons/md";
import { BsFillHandbagFill } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import UserInfo from "./UserInfo";

const HomeNavbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.userReducer);
  const location = useLocation();

  return (
    <Flex
      h={"80px"}
      p={"10px"}
      justifyContent={{ base: "space-between", sm: "", md: "space-around" }}
      alignItems={"center"}
      w={{
        base: "95%",
        sm: "90%",
        md: "90%",
        lg: location?.pathname === "/" ? "70%" : "88%"
      }}
      m={"auto"}
      gap={{ base: "5px", sm: "5px", md: "100px" }}
      fontSize={
        location.pathname === "/"
          ? { base: "12px", sm: "15px", md: "16px", lg: "18px" }
          : { base: "12px", sm: "15px" }
      }
    >
      <Flex
        w={{ base: "65%", sm: "65%", md: "65%", lg: "30%" }}
        justifyContent="start"
        alignItems={"center"}
        direction={{ base: "row", sm: "row", md: "row" }}
      >
        <Box w={{ base: "80px", sm: "90px", md: "120px", lg: "160px" }}>
          <Link to={"/"}>
            <Image
              w={"100%"}
              h={{ base: "40px", sm: "40px", md: "70px", lg: "90px" }}
              src={"https://i.imgur.com/Gex3smL.jpg"}
              alt={"logo"}
            />
          </Link>
        </Box>
        {location?.pathname !== "/" && (
          <Box>
            <LocationSearch />
          </Box>
        )}
      </Flex>
      <Flex
        display={{ base: "none", sm: "flex", md: "flex", lg: "flex" }}
        w={{ base: "50%", sm: "50%", md: "50%", lg: "70%" }}
        direction={"row"}
        justifyContent={"end"}
        gap={"65px"}
        alignItems={"center"}
      >
        {location?.pathname !== "/" && (
          <Flex
            alignItems={"center"}
            gap={"10px"}
            _hover={{ color: "red", cursor: "pointer" }}
          >
            <FiSearch fontWeight={"650"} />
            <Text fontWeight={"650"}>Search</Text>
          </Flex>
        )}
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
      </Flex>
      <Flex
        display={{ base: "flex", sm: "none", md: "none", lg: "none" }}
        w={{ base: "30%", sm: "30%", md: "70%" }}
        gap={"5px"}
        justifyContent={"flex-end"}
      >
        {token === null ? (
          <Flex
            alignItems={"center"}
            gap={"1px"}
            _hover={{ color: "red", cursor: "pointer" }}
          >
            <FaUserAlt fontSize={{ base: "10px", sm: "11px", md: "15px" }} />
            <Login />
          </Flex>
        ) : (
          <UserInfo />
        )}
        <Flex
          alignItems={"center"}
          gap={"5px"}
          _hover={{ color: "red", cursor: "pointer" }}
          onClick={() => {
            navigate("/cart");
          }}
        >
          <BsFillHandbagFill />
          <Text
            fontWeight={"650"}
            fontSize={{ base: "10px", sm: "11px", md: "15px" }}
          >
            Bag
          </Text>
        </Flex>
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
        <Box w={{ base: "50px", sm: "100px", md: "170px", lg: "170px" }}>
          <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}
            size={{ base: "xs", sm: "xs", md: "xs", lg: "xs" }}
          >
            <DrawerOverlay />
            <DrawerContent pl={"50px"} w="100px">
              <DrawerCloseButton />
              <DrawerBody>
                <Flex
                  alignItems={"center"}
                  gap={"10px"}
                  _hover={{ color: "red", cursor: "pointer" }}
                >
                  <FiSearch fontWeight={"650"} />
                  <Text fontWeight={"650"}>Search</Text>
                </Flex>
                <Flex
                  alignItems={"center"}
                  gap={"10px"}
                  _hover={{ color: "red", cursor: "pointer" }}
                >
                  <MdLocalOffer />
                  <Text fontWeight={"650"}>Offers</Text>
                </Flex>
                <Flex
                  alignItems={"center"}
                  gap={"10px"}
                  _hover={{ color: "red", cursor: "pointer" }}
                >
                  <MdHelp />
                  <Text fontWeight={"650"}>Help</Text>
                </Flex>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Box>
      </Flex>
    </Flex>
  );
};

export default HomeNavbar;
