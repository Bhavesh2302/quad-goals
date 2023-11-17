import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  useToast,
  Flex
} from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../Redux/Reducers/UserAuthReducer/action";
import { useNavigate } from "react-router-dom";

const UserInfo = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const dispatch = useDispatch();
  const logoutToast = useToast();
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.userReducer);

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
    <>
      <Button
        ref={btnRef}
        variant={"unstyled"}
        onClick={onOpen}
        size={"md"}
        fontSize={{ base: "10px", sm: "10px", md: "15px", lg: "15px" }}
      >
        <Flex alignItems={"center"}>
          <FaUserCircle size={"18px"} />
          {userData?.name}
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
            <Button onClick={handleLogout}>Logout</Button>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default UserInfo;
