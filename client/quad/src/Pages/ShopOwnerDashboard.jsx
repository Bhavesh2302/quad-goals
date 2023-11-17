import { Box, Button } from "@chakra-ui/react";
import React from "react";
import Navbar from "../Components/Navbar";

const ShopOwnerDashboard = () => {
  return (
    <Box w={{ base: "100%" }} border="1px solid">
      <Navbar />
      <Box>
        <Button>Add New Restaurant</Button>
      </Box>
    </Box>
  );
};

export default ShopOwnerDashboard;
