import { Box, FormControl, FormLabel, Select } from "@chakra-ui/react";
import React from "react";

const SelectField = ({
  title,
  name,
  value,
  onChange,
  variant = "filled",
  optionList,
  isRequired = true
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
        <Select
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
          h={{ base: "30px", sm: "30px", md: "40px", lg: "40px" }}
        >
          {optionList.length !== 0 &&
            optionList.map((opt, index) => (
              <option value={opt.value || opt} key={index}>
                {opt.name || opt.value || opt}
              </option>
            ))}
        </Select>
      </Box>
    </FormControl>
  );
};

export default SelectField;
