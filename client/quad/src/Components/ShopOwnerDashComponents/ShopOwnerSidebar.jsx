import { Box, Text, useToast } from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { userLogout } from "../../Redux/Reducers/UserAuthReducer/action";
import { useNavigate } from "react-router-dom";

const ShopOwnerSidebar = ({
  sideMenu,
  setActiveSideMenu,
  activeSideMenu,
  setActiveMenu,
  addNew,
  setAddNew
}) => {
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
      duration: 2000,
      position: "top"
    });
  };

  return (
    <Box w="100%" h={addNew ? "690px" : "400px"} backgroundColor="white">
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
          onClick={() => {
            if (el.name === "Logout") handleLogout();
            else {
              if (addNew && activeSideMenu === "Restaurants") setAddNew(false);
              else if (addNew && activeSideMenu !== "Restaurants") setAddNew(false)

              setActiveSideMenu(el.name);
              setActiveMenu(el);
            }
          }}
          fontSize={{ base: "12px", sm: "12px", md: "16px", lg: "16px" }}
        >
          <Box
            borderLeft={
              activeSideMenu === el.name ? "2px solid red" : "2px solid white "
            }
            pl={{ base: "10px", sm: "10px", md: "20px" }}
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
