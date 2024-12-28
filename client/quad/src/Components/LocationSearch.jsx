import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
  Button,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const LocationSearch = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const { city } = useParams();

  return (
    <>
      <Button
        ref={btnRef}
        variant={"link"}
        fontSize={{ base: "10px", sm: "11px", md: "15px" }}
        fontWeight={"500"}
        onClick={onOpen}
      >
         {city?.charAt(0).toUpperCase() + city?.slice(1).toLowerCase()}, India
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody></DrawerBody>
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}></Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default LocationSearch;
