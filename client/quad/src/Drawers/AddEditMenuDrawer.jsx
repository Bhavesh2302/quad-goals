import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Text,
  Flex,
  Box
} from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";
import { BsShopWindow } from "react-icons/bs";
import InputField from "../BaseComponents/InputField";

const AddEditMenuDrawer = ({
  onClose,
  isOpen,
  onOpen,
  title,
  btnRef,
  restaurant,
  data
}) => (
  <>
    <Box
      ref={btnRef}
      onClick={onOpen}
      display="flex"
      alignItems="center"
      justifyContent="center"
      w="100%"
      h="100%"
    >
      {title}
    </Box>
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
      size={{ base: "xs", sm: "xs", md: "xs", lg: "xs" }}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader
          pl={{ base: "10px", sm: "15px", md: "20px" }}
          bg="#c2d6ab"
        >
          <Flex
            fontSize={{ base: "12px", sm: "15px", md: "18px" }}
            alignItems="center"
            justifyContent="flex-start"
            gap="10px"
            fontWeight="650"
          >
            <Box onClick={onClose} cursor="pointer">
              <FaArrowLeft />
            </Box>
            <Text color="white">{data ? "Edit" : "Add"} Menu</Text>
          </Flex>
        </DrawerHeader>
        <DrawerBody pl={{ base: "10px", sm: "15px", md: "20px" }} pt="25px">
          <Flex
            alignItems="center"
            justifyContent="flex-start"
            fontWeight="600"
            gap="15px"
            fontSize={{ base: "16px", sm: "16px", md: "18px", lg: "18px" }}
          >
            <BsShopWindow fontSize="22px" />
            <Text>{restaurant.rest_name}</Text>
          </Flex>
          <Box
            h="90%"
            w="100%"
            border="1px solid #dcdcdb"
            borderRadius="8px"
            mt="20px"
            p="8px"
          >
            <InputField title="Menu Name" value={data ? data.title : ""} />
            <InputField title="Menu Image URL" value={data ? data.item_image : ""} />
            <InputField title="Menu Type" value={data ? data.type : ""} />
            <InputField title="Menu Price" value={data ? data.price : ""} />
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  </>
);

export default AddEditMenuDrawer;
