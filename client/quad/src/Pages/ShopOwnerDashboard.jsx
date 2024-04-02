import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  Image,
  useDisclosure
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import ShopOwnerSidebar from "../Components/ShopOwnerDashComponents/ShopOwnerSidebar";
import { BsShop, BsBagDash, BsPeople } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import Restaurants from "../Components/ShopOwnerDashComponents/Restaurants";
import Orders from "../Components/ShopOwnerDashComponents/Orders";
import Customers from "../Components/ShopOwnerDashComponents/Customers";
import ShopOwnerAccount from "../Components/ShopOwnerDashComponents/ShopOwnerAccount";
import { GiHamburgerMenu } from "react-icons/gi";
import { RestaurantForm } from "../Components/ShopOwnerDashComponents/RestaurantForm";
import { UserInfoDrawer } from "../Drawers";

const ShopOwnerDashboard = () => {
  const [addNew, setAddNew] = useState(false);
  const sideMenu = [
    {
      id: 1,
      name: "Restaurants",
      icon: <BsShop />,
      component: <Restaurants addNew={addNew} setAddNew={setAddNew} />
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <Box w="100%" m="auto" backgroundColor="#f3f3f3" pt="10px" h="780px">
      <Box
        w={{ base: "95%", sm: "95%", md: "95%", lg: "70%" }}
        m="auto"
        backgroundColor="white"
        h="60px"
        mb="10px"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        px="20px"
      >
        <Flex alignItems="center" justifyContent="flex-start">
          <IconButton
            ref={btnRef}
            icon={<GiHamburgerMenu />}
            bg="transparent"
            display={{ base: "block", sm: "block", md: "block", lg: "none" }}
            onClick={onOpen}
          ></IconButton>
          <Link to="/">
            <Image
              src="https://i.imgur.com/Gex3smL.jpg"
              w={"100px"}
              h={"45px"}
            />
          </Link>
        </Flex>
        <UserInfoDrawer />
      </Box>
      <Flex
        w={{ base: "95%", sm: "95%", md: "95%", lg: "70%" }}
        m="auto"
        gap="10px"
        h={addNew ? "690px" : "400px"}
      >
        <Box
          display={{ base: "none", sm: "none", md: "none", lg: "block" }}
          w="20%"
        >
          <ShopOwnerSidebar
            sideMenu={sideMenu}
            activeSideMenu={activeSideMenu}
            setActiveSideMenu={setActiveSideMenu}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            addNew={addNew}
            setAddNew={setAddNew}
          />
        </Box>
        <Box
          w={{ base: "100%", sm: "100%", md: "100%", lg: "80%" }}
          h={addNew ? "700px" : "400px"}
          backgroundColor="#f3f3f3"
        >
          {addNew ? (
            <RestaurantForm setAddNew={setAddNew} />
          ) : (
            activeMenu?.component
          )}
        </Box>
      </Flex>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody onClick={onClose}>
            <ShopOwnerSidebar
              sideMenu={sideMenu}
              activeSideMenu={activeSideMenu}
              setActiveSideMenu={setActiveSideMenu}
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenu}
              addNew={addNew}
              setAddNew={setAddNew}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default ShopOwnerDashboard;
