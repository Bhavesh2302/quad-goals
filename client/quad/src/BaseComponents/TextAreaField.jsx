import { Box, FormControl, FormLabel, Textarea } from "@chakra-ui/react";
import React from "react";

const TextAreaField = ({
  title,
  isRequired = true,
  placeholder = "",
  onChange,
  value,
  name,
  variant = "filled",
  height = "100px"
}) => {
  return (
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
        <Textarea
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
          h={height}
          placeholder={placeholder}
        />
      </Box>
    </FormControl>
  );
};

export default TextAreaField;
