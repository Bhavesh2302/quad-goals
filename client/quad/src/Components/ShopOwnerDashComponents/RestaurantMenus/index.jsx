import { SimpleGrid } from "@chakra-ui/react";
import React from "react";
import MenuCard from "./MenuCard";

const RestaurantMenus = ({ menus, restaurant }) => (
  <SimpleGrid w="100%" columns={[2, 3, 3, 5]} gap="20px">
    {menus.length !== 0 &&
      menus.map((el) => (
        <MenuCard key={el.title} el={el} restaurant={restaurant} />
      ))}
  </SimpleGrid>
);

export default RestaurantMenus;
