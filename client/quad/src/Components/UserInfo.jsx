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

const UserInfo = () => {
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
          {/* <FaUserCircle size={"22px"} /> */}
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
          <DrawerHeader></DrawerHeader>
          <DrawerBody>
            {userData?.role === "shopOwner" && (
              <Link to="/shopownerdashboard">
                <Text>See Dashboard</Text>
              </Link>
            )}
            <Button onClick={handleLogout}>Logout</Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default UserInfo;
