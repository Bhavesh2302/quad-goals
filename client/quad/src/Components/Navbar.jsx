import { Box, Flex, Image, Text} from '@chakra-ui/react'
import React from 'react'
import Login from '../Pages/Login'
import LocationSearch from './LocationSearch'
import { FaUserAlt } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { MdHelp, MdLocalOffer } from 'react-icons/md';
import { BsFillHandbagFill,  } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Flex h={"80px"}  p={"10px"} justifyContent={"space-around"} alignItems={"center"} w={"85%"} m={"auto"} gap={"100px"}>
         <Flex w={"30%"}  justifyContent={"space-evenly"} alignItems={"center"}>
              <Box w={"90px"}>
                  <Link to={"/"}>
                     <Image w={"100%"} src = {"https://i.imgur.com/Gex3smL.jpg"} alt={"logo"}/>
                 </Link>
              </Box>
              <Box>
                   <LocationSearch/>
              </Box>
         </Flex>
         <Flex w={"70%"}  justifyContent={"end"} gap={"65px"} alignItems={"center"}>
              <Flex  alignItems={"center"} gap={"10px"} _hover={{color:"red", cursor:"pointer"}}>
                    <FiSearch fontWeight={"650"}/>
                    <Text fontWeight={"650"} fontSize={"15px"}>Search</Text>
              </Flex>
              <Flex  alignItems={"center"} gap={"10px"} _hover={{color:"red", cursor:"pointer"}}>
                    <MdLocalOffer/>
                    <Text fontWeight={"650"} fontSize={"15px"}>Offers</Text>
              </Flex>
              <Flex  alignItems={"center"} gap={"10px"} _hover={{color:"red", cursor:"pointer"}}>
                    <MdHelp/>
                    <Text fontWeight={"650"} fontSize={"15px"}>Help</Text>
              </Flex>
              <Flex alignItems={"center"} gap={"10px"} _hover={{color:"red", cursor:"pointer"}}>
                    <FaUserAlt/>
                    <Login/>
              </Flex>
              <Flex alignItems={"center"} gap={"10px"} _hover={{color:"red", cursor:"pointer"}}> 
                    <BsFillHandbagFill/>
                    <Text fontWeight={"650"} fontSize={"15px"}>Bag</Text>
              </Flex>
         </Flex>
    </Flex>
  )
}

export default Navbar