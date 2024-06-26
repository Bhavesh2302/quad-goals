import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup
} from "@chakra-ui/react";
import React from "react";

const InputField = ({
  title,
  value,
  name,
  onChange,
  variant = "filled",
  type,
  isRequired = true,
  showPassword = false,
  setShowPassword,
  showPasswordField = false,
  placeholder = ""
}) => {
  return !showPasswordField ? (
    <FormControl isRequired={isRequired}>
      <Box mb={"20px"} w="100%">
        {title && (
          <FormLabel
            fontSize={{
              base: "11px",
              sm: "11px",
              md: "14px",
              lg: "16px"
            }}
          >
            {title}
          </FormLabel>
        )}
        <Input
          type={type}
          w={"100%"}
          name={name}
          value={value}
          onChange={onChange}
          borderRadius={"0px"}
          variant={variant}
          fontSize={{
            base: "11px",
            sm: "11px",
            md: "12px",
            lg: "14px"
          }}
          h={{ base: "30px", sm: "30px", md: "40px", lg: "40px" }}
          placeholder={placeholder}
        />
      </Box>
    </FormControl>
  ) : (
    <FormControl isRequired>
      <Box mb={"20px"}>
        <FormLabel
          fontSize={{
            base: "11px",
            sm: "11px",
            md: "14px",
            lg: "16px"
          }}
        >
          Password
        </FormLabel>
        <InputGroup w={"100%"} name={"password"}>
          <Input
            type={showPassword ? "text" : "password"}
            value={value}
            onChange={onChange}
            borderRadius={"0px"}
            name={name}
            variant={variant}
            h={{ base: "30px", sm: "30px", md: "40px", lg: "40px" }}
          />
          <Button
            variant={"solid"}
            borderRadius={"0px"}
            onClick={() => setShowPassword((showPassword) => !showPassword)}
            h={{ base: "30px", sm: "30px", md: "40px", lg: "40px" }}
          >
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputGroup>
      </Box>
    </FormControl>
  );
};

export default InputField;
