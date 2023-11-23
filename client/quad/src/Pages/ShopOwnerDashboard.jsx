import { Box, Flex, Image } from "@chakra-ui/react";
import React, { useState } from "react";
import ShopOwnerSidebar from "../Components/ShopOwnerDashComponents/ShopOwnerSidebar";
import { BsShop, BsBagDash, BsPeople } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Restaurants from "../Components/ShopOwnerDashComponents/Restaurants";
import Orders from "../Components/ShopOwnerDashComponents/Orders";
import Customers from "../Components/ShopOwnerDashComponents/Customers";
import ShopOwnerAccount from "../Components/ShopOwnerDashComponents/ShopOwnerAccount";

const ShopOwnerDashboard = () => {
  const { userData } = useSelector((state) => state.userReducer);
  const sideMenu = [
    {
      id: 1,
      name: "Restaurants",
      icon: <BsShop />,
      component: <Restaurants />
    },
    {
      id: 2,
      name: "Orders",
      icon: <BsBagDash />,
      component: <Orders />
    },
    {
      id: 3,
      name: "My Consumers",
      icon: <BsPeople />,
      component: <Customers />
    },
    {
      id: 4,
      name: "My Account",
      icon: <FaRegUser />,
      component: <ShopOwnerAccount />
    },
    {
      id: 5,
      name: "Logout",
      icon: <AiOutlineLogout />
    }
  ];
  const [activeSideMenu, setActiveSideMenu] = useState(sideMenu[0].name);
  const [activeMenu, setActiveMenu] = useState(sideMenu[0]);

  return (
    <Box w="100%" m="auto" backgroundColor="#f3f3f3" pt="10px">
      <Box
        w={{ base: "95%", sm: "95%", md: "90%", lg: "70%" }}
        m="auto"
        backgroundColor="white"
        h="60px"
        mb="10px"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        px="20px"
      >
        <Link to="/">
          <Image src="https://i.imgur.com/Gex3smL.jpg" w={"100px"} h={"45px"} />
        </Link>
        <Box fontWeight="650" fontSize="15px">
          {userData.name}
        </Box>
      </Box>
      <Flex
        w={{ base: "95%", sm: "95%", md: "90%", lg: "70%" }}
        m="auto"
        gap="10px"
      >
        <ShopOwnerSidebar
          sideMenu={sideMenu}
          activeSideMenu={activeSideMenu}
          setActiveSideMenu={setActiveSideMenu}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
        />
        <Box w="80%" h="500px" backgroundColor="#f3f3f3">
          {activeMenu?.component}
        </Box>
      </Flex>
    </Box>
  );
};

export default ShopOwnerDashboard;
