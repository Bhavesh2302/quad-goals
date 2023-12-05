import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Box,
  Button,
  Text
} from "@chakra-ui/react";
import InputField from "../../BaseComponents/InputField";

const ConformationModal = ({
  isOpen,
  onOpen,
  onClose,
  content = null,
  name = "",
  headerText = "",
  onClick = null,
  guideline = "Are you sure want to remove"
}) => {
  const [text, setText] = useState("");
  return (
    <>
      <Box
        bg={"red.400"}
        color="white"
        h={{ base: "25px", sm: "25px", md: "30px", lg: "40px" }}
        w={{ base: "25px", sm: "25px", md: "30px", lg: "40px" }}
        onClick={onOpen}
        borderRadius="50%"
        fontSize={{
          base: "12px",
          sm: "12px",
          md: "14px",
          lg: "16px"
        }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
      >
        {content}
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{headerText}</ModalHeader>
          <ModalBody>
            <Text
              fontWeight="600"
              fontSize={{ base: "12px", sm: "12px", md: "14px", lg: "15px" }}
            >
              {guideline}
              <q fontWeight="bold">{name}</q>
            </Text>
            <Text
              fontWeight="medium"
              my="12px"
              fontSize={{ base: "10px", sm: "10px", md: "12px", lg: "12.5px" }}
            >
              Type <q style={{ fontWeight: "700" }}>Remove</q> to permanently
              remove
            </Text>
            <InputField
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Remove"
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              disabled={text !== "Remove"}
              bg="red.500"
              onClick={() => {
                onClick();
              }}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConformationModal;
