import { Box, Skeleton, SkeletonText } from "@chakra-ui/react";
import React from "react";

const RestaurantSkeleton = ({ length }) => {
  const skeletonList = new Array(length).fill(0);

  return (
    <Box display="flex" gap="20px">
      {skeletonList.map(() => (
        <Box>
          <Skeleton h="180px" w="250px" />
          <SkeletonText mt="4" noOfLines={3} spacing="4" skeletonHeight="2" />
        </Box>
      ))}
    </Box>
  );
};

export default RestaurantSkeleton;
