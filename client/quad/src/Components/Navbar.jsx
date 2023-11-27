import { Box, Flex, Image, Text } from "@chakra-ui/react";
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

const Navbar = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.userReducer);
  const location = useLocation();

  return (
    <Flex
      h={"80px"}
      p={"10px"}
      justifyContent={{ base: "space-between", sm: "", md: "space-around" }}
      alignItems={"center"}
      w={{ base: "95%", sm: "90%", md: "90%", lg: "88%" }}
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
        <Box w={location?.pathname === "/" ? "160px" : "100px"}>
          <Link to={"/"}>
            <Image
              w={"100%"}
              h={location?.pathname === "/" ? "90px" : "50px"}
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
        display={{ base: "none", sm: "none", md: "none", lg: "flex" }}
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
        {
          <Flex
            alignItems={"center"}
            gap={"10px"}
            _hover={{ color: "red", cursor: "pointer" }}
          >
            <MdLocalOffer />
            <Text fontWeight={"650"}>Offers</Text>
          </Flex>
        }
        {
          <Flex
            alignItems={"center"}
            gap={"10px"}
            _hover={{ color: "red", cursor: "pointer" }}
          >
            <MdHelp />
            <Text fontWeight={"650"}>Help</Text>
          </Flex>
        }

        {token === null ? (
          <Flex
            alignItems={"center"}
            gap={"10px"}
            _hover={{ color: "red", cursor: "pointer" }}
          >
            <FaUserAlt />
            <Login />
          </Flex>
        ) : (
          <UserInfo />
        )}
        <Flex
          alignItems={"center"}
          gap={"10px"}
          _hover={{ color: "red", cursor: "pointer" }}
          onClick={() => {
            navigate("/cart");
          }}
        >
          <BsFillHandbagFill />
          <Text fontWeight={"650"}>Bag</Text>
        </Flex>
      </Flex>
      <Flex
        display={{ base: "flex", sm: "flex", md: "flex", lg: "none" }}
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
            <FaUserAlt />
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
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="unstyled"
          />
          <MenuList>
            <MenuItem command="⌘">
              <Flex
                alignItems={"center"}
                gap={"10px"}
                _hover={{ color: "red", cursor: "pointer" }}
              >
                <FiSearch fontWeight={"650"} />
                <Text fontWeight={"650"}>Search</Text>
              </Flex>
            </MenuItem>
            <MenuItem command="⌘">
              <Flex
                alignItems={"center"}
                gap={"10px"}
                _hover={{ color: "red", cursor: "pointer" }}
              >
                <MdLocalOffer />
                <Text fontWeight={"650"}>Offers</Text>
              </Flex>
            </MenuItem>
            <MenuItem command="⌘">
              <Flex
                alignItems={"center"}
                gap={"10px"}
                _hover={{ color: "red", cursor: "pointer" }}
              >
                <MdHelp />
                <Text fontWeight={"650"}>Help</Text>
              </Flex>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default Navbar;
