import { Box, Image, Text, Tooltip } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaStar, FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { MdFormatListBulletedAdd } from "react-icons/md";

const RestaurantCard = ({
  rest_name,
  image_rest,
  cuisines,
  cost,
  address,
  d_time,
  rating,
  _id,
  handleDelete,
  handleEdit
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const actionButtons = [
    { title: "Edit", onClick: () => handleEdit(_id), icon: <FaPencilAlt /> },
    { title: "Delete", onClick: () => handleDelete(_id), icon: <FaTrashAlt /> }
  ];

  return (
    <Box
      w={{ base: "100%", sm: "100%", md: "45%", lg: "250px" }}
      h="282px"
      borderRadius="5px"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      position="relative"
    >
      <Box h="155px" w="100%">
        <Image
          w="100%"
          h="100%"
          src={image_rest}
          objectFit="fill"
          borderTopRadius="5px"
        />
      </Box>
      <Box p="10px" bg="white" borderBottomRadius="5px">
        <Text
          fontWeight="600"
          w="100%"
          height="20px"
          textOverflow="ellipsis"
          overflow="hidden"
        >
          {rest_name}
        </Text>
        <Box height="30px" fontSize="14px" color="#686b78" textAlign="start">
          {cuisines.join(", ")}
        </Box>
        <Box
          display="flex"
          fontSize="14px"
          justifyContent="space-between"
          alignItems="center"
          mt="15px"
        >
          <Box
            display="flex"
            justifyContent="space-evenly"
            borderRadius="4px"
            gap="2px"
            p="0px 5px"
            alignItems="center"
            color="white"
            bg={rating > 4 ? "#48c479" : "#f9791e"}
          >
            <Box>
              <FaStar fontSize="12px" />
            </Box>
            <Box>
              <Text>{rating}</Text>
            </Box>
          </Box>
          <Box>|</Box>
          <Box color="#686b78">{`${d_time} MINS`}</Box>
          <Box>|</Box>
          <Box color="#686b78">{`₹ ${cost} For Two`}</Box>
        </Box>
        <Box textAlign="start" color="#686b78" fontSize="14px">
          {address}
        </Box>
        {isHovering && (
          <Box
            display={"flex"}
            h="100%"
            w="100%"
            bg="rgba(0, 0, 0, 0.6)"
            position="absolute"
            top="0"
            left="0"
            alignItems="center"
            justifyContent="center"
            borderRadius="5px"
            gap="10px"
          >
            {actionButtons.map((item) => (
              <Tooltip label={item.title} placement="bottom">
                <Box
                  bg={item.title === "Edit" ? "blue.400" : "red.400"}
                  color="white"
                  h={{ base: "25px", sm: "25px", md: "30px", lg: "40px" }}
                  w={{ base: "25px", sm: "25px", md: "30px", lg: "40px" }}
                  onClick={item.onClick}
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
                  {item.icon}
                </Box>
              </Tooltip>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default RestaurantCard;
