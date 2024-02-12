import {
  Box,
  Image,
  Text,
  Tooltip,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { AddEditMenuDrawer } from "../../../Drawers";
import { useDispatch, useSelector } from "react-redux";
import { updateMenu } from "../../../Redux/Reducers/ShopOwnerReducer/action";

const MenuCard = ({ el, restaurant }) => {
  const [hoverActive, setHoverActive] = useState(false);
  const [menu, setMenu] = useState(el);
  const { token } = useSelector((state) => state.userReducer);
  const { onClose, onOpen, isOpen } = useDisclosure();
  const btnRef = useRef();
  const dispatch = useDispatch();
  const updateMenuToast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenu({ ...menu, [name]: value });
  };

  const handleEditMenu = (e) => {
    e.preventDefault();
    dispatch(updateMenu(menu, token, el._id)).then((res) => {
      if (res.type === "UPDATE_MENU_SUCCESS")
        updateMenuToast({
          title: "Menu Updated successfully!",
          isClosable: true,
          duration: 2000,
          status: "success",
          position: "top-right"
        });
    });
  };

  return (
    <Box
      h="auto"
      borderRadius="5px"
      textAlign="left"
      boxShadow="rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px"
      position="relative"
      onMouseEnter={() => setHoverActive(true)}
      onMouseLeave={() => setHoverActive(false)}
    >
      <Box
        w="100%"
        h={{ base: "110px", sm: "110px", md: "140px", lg: "150px" }}
        objectFit="fill"
        borderTopRadius="4px"
      >
        <Image w="100%" h="100%" src={el?.item_image} borderTopRadius="4px" />
      </Box>
      <Box w="100%" h="70px" p="5px" fontWeight="550">
        <Text
          fontSize={{ base: "10px", sm: "10px", md: "12px", lg: "12px" }}
          fontWeight="650"
        >
          {el.title}
        </Text>
        <Text fontSize={{ base: "10px", sm: "10px", md: "11px", lg: "11px" }}>
          ₹ {el.price}
        </Text>
        <Tooltip placement="bottom" label={el.description}>
          <Text
            fontSize={{ base: "10px", sm: "10px", md: "11px", lg: "11px" }}
            h="45px"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            overflow="hidden"
          >
            {el.description}
          </Text>
        </Tooltip>
      </Box>
      {hoverActive && (
        <Box
          position="absolute"
          zIndex="10"
          h="30px"
          w="100%"
          bottom="-22px"
          bg="white"
          borderRadius="5px"
          display="flex"
          alignItems="center"
          justifyContent="space-around"
          fontWeight="550"
          fontSize={{ base: "10px", sm: "10px", md: "11px", lg: "11px" }}
          color="white"
          cursor="pointer"
        >
          <Box
            w="50%"
            h="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="blue.400"
            borderBottomLeftRadius="5px"
          >
            <AddEditMenuDrawer
              btnRef={btnRef}
              onClose={onClose}
              onOpen={onOpen}
              isOpen={isOpen}
              title="Edit"
              restaurant={restaurant}
              data={el}
              onChange={handleChange}
              handleSave={handleEditMenu}
            />
          </Box>
          <Box
            w="50%"
            h="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="#fcd5d1"
            borderBottomRightRadius="5px"
            color="red"
          >
            Delete
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default MenuCard;
