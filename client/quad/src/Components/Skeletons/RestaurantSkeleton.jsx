import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";
import React from "react";

const RestaurantSkeleton = ({ height = "180px", mainPage = false }) => {
  return mainPage ? (
    <Box h={height} textAlign="center">
      <Skeleton height="50%" w={{ md: "100%", lg: "90%" }} />
      <SkeletonText
        mt="4"
        noOfLines={3}
        spacing="4"
        skeletonHeight="2"
        w={{ md: "100%", lg: "90%" }}
      />
    </Box>
  ) : (
    <Box>
      <Skeleton
        h="180px"
        w={{ base: "250px", sm: "300px", md: "330px", lg: "250px" }}
      />
      <SkeletonText mt="4" noOfLines={3} spacing="4" skeletonHeight="2" />
    </Box>
  );
};

export default RestaurantSkeleton;
