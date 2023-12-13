import { SimpleGrid } from "@chakra-ui/react";
import React from "react";
import MenuCard from "./MenuCard";

const RestaurantMenus = ({
  menus,
  btnRef,
  onClose,
  onOpen,
  isOpen,
  restaurant
}) => {
  return (
    <SimpleGrid w="100%" columns={[2, 2, 3, 6]} gap="20px">
      {menus.length !== 0 &&
        menus.map((el) => (
          <MenuCard
            el={el}
            btnRef={btnRef}
            onClose={onClose}
            onOpen={onOpen}
            isOpen={isOpen}
            restaurant={restaurant}
          />
        ))}
    </SimpleGrid>
  );
};

export default RestaurantMenus;
