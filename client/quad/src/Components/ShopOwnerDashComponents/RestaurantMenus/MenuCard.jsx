import { Box, Image } from "@chakra-ui/react";
import React from "react";

const MenuCard = ({ el }) => {
  return (
    <Box h="auto" border="1px solid" borderRadius="5px">
      <Box w="100%" h="150px" objectFit="fill" borderRadius="5px">
        <Image w="100%" h="100%" src={el?.item_image} borderRadius="5px" />
      </Box>
      <Box></Box>
    </Box>
  );
};

export default MenuCard;
