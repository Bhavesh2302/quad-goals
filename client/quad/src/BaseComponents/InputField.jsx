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
import { useLocation } from "react-router-dom";

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
  showPasswordField = false
}) => {
  const location = useLocation();

  return !showPasswordField ? (
    <FormControl isRequired={isRequired}>
      <Box mb={"20px"} w="100%">
        <FormLabel
          fontSize={{
            base: "12px",
            sm: "12px",
            md: "15px",
            lg: location?.pathname === "/" ? "18px" : "16px"
          }}
        >
          {title}
        </FormLabel>
        <Input
          type={type}
          w={"100%"}
          name={name}
          value={value}
          onChange={onChange}
          borderRadius={"0px"}
          variant={variant}
          fontSize={{
            base: "10px",
            sm: "10px",
            md: "12px",
            lg: "14px"
          }}
          h={{ base: "30px", sm: "30px", md: "40px", lg: "45px" }}
        />
      </Box>
    </FormControl>
  ) : (
    <FormControl isRequired>
      <Box mb={"20px"}>
        <FormLabel
          fontSize={{
            base: "12px",
            sm: "12px",
            md: "15px",
            lg: "18px"
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
            h={{ base: "30px", sm: "30px", md: "40px", lg: "45px" }}
          />
          <Button
            variant={"solid"}
            borderRadius={"0px"}
            onClick={() => setShowPassword((showPassword) => !showPassword)}
            h={{ base: "30px", sm: "30px", md: "40px", lg: "45px" }}
          >
            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
          </Button>
        </InputGroup>
      </Box>
    </FormControl>
  );
};

export default InputField;
