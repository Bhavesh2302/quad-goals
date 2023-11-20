import { Box, Text, useToast } from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { userLogout } from "../Redux/Reducers/UserAuthReducer/action";
import { useNavigate } from "react-router-dom";

const ShopOwnerSidebar = ({ sideMenu, setActiveSideMenu, activeSideMenu }) => {
  const dispatch = useDispatch();
  const logoutToast = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(userLogout());
    navigate("/");
    logoutToast({
      title: "Logout successfully",
      status: "success",
      isClosable: true,
      duration: 1500,
      position: "top"
    });
  };

  return (
    <Box w="20%" h="500px" backgroundColor="white">
      {sideMenu.map((el, i) => (
        <Box
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          gap="10px"
          h="60px"
          ml="20px"
          fontWeight="550"
          _hover={{ color: "red", cursor: "pointer" }}
          color={activeSideMenu === el.name && "red"}
          key={i}
          onClick={() =>
            el.name === "Logout" ? handleLogout() : setActiveSideMenu(el.name)
          }
        >
          <Box
            borderLeft={
              activeSideMenu === el.name ? "2px solid red" : "2px solid white "
            }
            pl="20px"
          >
            {el.icon}
          </Box>
          <Text>{el.name}</Text>
        </Box>
      ))}
    </Box>
  );
};

export default ShopOwnerSidebar;
