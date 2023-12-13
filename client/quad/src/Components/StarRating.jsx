import { Box } from "@chakra-ui/react";
import React from "react";
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";

const StarRating = ({ stars }) => {
  const starList = new Array(5).fill(0);

  return (
    <Box display="flex" gap="2px" fontSize="18px">
      {starList?.map((_, index) =>
        stars - index < 1 && stars - index > 0 ? (
          <IoStarHalf key={index} color="#ffc901" />
        ) : stars >= index + 1 ? (
          <IoStar key={index} color="#ffc901" />
        ) : (
          <IoStarOutline key={index} color="#ffc901" />
        )
      )}
    </Box>
  );
};

export default StarRating;
