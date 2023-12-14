import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Text,
  Flex,
  Box,
  DrawerFooter,
  Button
} from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";
import { BsShopWindow } from "react-icons/bs";
import InputField from "../BaseComponents/InputField";
import SelectField from "../BaseComponents/SelectField";
import TextAreaField from "../BaseComponents/TextAreaField";

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
      w="100%"
    >
      <DrawerOverlay />
      <DrawerContent w="100%">
        <DrawerHeader
          pl={{ base: "10px", sm: "15px", md: "20px" }}
          bg="#c2d6ab"
          w="100%"
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
        <DrawerBody
          pl={{ base: "10px", sm: "15px", md: "20px" }}
          pt="25px"
          w="100%"
          pr={{ base: "10px", sm: "15px", md: "20px" }}
        >
          <Flex
            alignItems="center"
            justifyContent="flex-start"
            fontWeight="600"
            gap={{ base: "5px", sm: "8px", md: "12px", lg: "15px" }}
            fontSize={{ base: "10px", sm: "10px", md: "16px", lg: "18px" }}
            mb="20px"
          >
            <BsShopWindow fontSize="22px" />
            <Text>{restaurant.rest_name}</Text>
          </Flex>
          <InputField title="Menu Name" value={data ? data.title : ""} />
          <InputField
            title="Menu Image URL"
            value={data ? data.item_image : ""}
          />
          <SelectField
            title="Menu Type"
            value={data ? data.type : ""}
            name="type"
            optionList={[{ value: "veg" }, { value: "non-veg" }]}
          />
          <InputField title="Menu Price" value={data ? data.price : ""} />
          <TextAreaField
            title="Description"
            value={data ? data?.description : ""}
          />
        </DrawerBody>
        <DrawerFooter
          display="flex"
          alignItems="center"
          justifyContent="space-evenly"
          w="100%"
          p="0"
          h="50px"
        >
          <Box
            w="50%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="#fcd5d1"
            color="red"
            h="100%"
          >
            Cancel
          </Box>
          <Box
            w="50%"
            h="100%"
            bg="#83cd29"
            color="white"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            Save
          </Box>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  </>
);

export default AddEditMenuDrawer;
