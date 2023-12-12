import { Box, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import MenuCard from "./MenuCard";

const RestaurantMenus = ({ menus }) => {
  return (
    <SimpleGrid w="100%" columns={[2, 4, 4, 6]} border="1px solid" gap="20px">
      {menus.length !== 0 && menus.map((el) => <MenuCard el={el} />)}
    </SimpleGrid>
  );
};

export default RestaurantMenus;
