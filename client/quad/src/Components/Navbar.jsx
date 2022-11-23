import { Box, Flex, Image, Text} from '@chakra-ui/react'
import React from 'react'
import Login from '../Pages/Login'
import LocationSearch from './LocationSearch'
import { FaUserAlt } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { MdHelp, MdLocalOffer } from 'react-icons/md';
import { BsFillHandbagFill,  } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { HamburgerIcon } from '@chakra-ui/icons'
import {
      Menu,
      MenuButton,
      MenuList,
      MenuItem,
      MenuItemOption,
      MenuGroup,
      MenuOptionGroup,
      MenuDivider,
      IconButton,
    } from '@chakra-ui/react'

const Navbar = () => {
      const navigate = useNavigate()
  return (
    <Flex  h={"80px"}  p={"10px"} justifyContent={{base: "space-between", sm: "", md: "space-around"}} alignItems={"center"} w={{base: "100%", sm: "100%", md: "85%", lg: "85%"}} m={"auto"} gap={{base:"5px", sm:"5px", md:"100px"}}>
         <Flex  w={{base: "65%", sm: "65%", md: "65%", lg: "30%"}}  justifyContent={{base: "start", sm:"start", md: "space-evenly"}} alignItems={"center"} direction={{base:"row", sm:"row", md:"row"}}>
              <Box w={"90px"}>
                  <Link to={"/"}>
                     <Image w={"100%"} h={"50px"} src = {"https://i.imgur.com/Gex3smL.jpg"} alt={"logo"}/>
                 </Link>
              </Box>
              <Box>
                   <LocationSearch/>
              </Box>
         </Flex>
         <Flex display={{base: "none", sm: "none", md: "none", lg: "flex"}} w={{base: "50%", sm: "50%", md: "50%", lg: "70%"}} direction={"row"}  justifyContent={"end"} gap={"65px"} alignItems={"center"}>
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
              <Flex alignItems={"center"} gap={"10px"} _hover={{color:"red", cursor:"pointer"}} onClick={()=>{
                  navigate("/cart")
              }}> 
                    <BsFillHandbagFill/>
                    <Text fontWeight={"650"} fontSize={"15px"}>Bag</Text>
              </Flex>
         </Flex>
         <Flex display={{base: "flex", sm: "flex", md: "flex", lg: "none"}} w={{base: "30%", sm: "30%", md: "70%"}} gap={"5px"} justifyContent={"flex-end"}>
                  <Flex alignItems={"center"} gap={"1px"} _hover={{color:"red", cursor:"pointer"}}>
                        <FaUserAlt/>
                        <Login/>
                  </Flex>
                           <Flex alignItems={"center"} gap={"5px"} _hover={{color:"red", cursor:"pointer"}} onClick={()=>{
                                          navigate("/cart")
                                    }}> 
                                          <BsFillHandbagFill/>
                                   <Text fontWeight={"650"} fontSize={{base:"10px", sm:"11px", md:"15px"}}>Bag</Text>
                             </Flex>
                  <Menu>
                        <MenuButton
                        as={IconButton}
                        aria-label='Options'
                        icon={<HamburgerIcon />}
                        variant="unstyled"
                        />
                        <MenuList>
                        <MenuItem command='⌘'>
                              <Flex  alignItems={"center"} gap={"10px"} _hover={{color:"red", cursor:"pointer"}}>
                                    <FiSearch fontWeight={"650"}/>
                                    <Text fontWeight={"650"} fontSize={"15px"}>Search</Text>
                              </Flex>
                        </MenuItem>
                        <MenuItem command='⌘'>
                              <Flex  alignItems={"center"} gap={"10px"} _hover={{color:"red", cursor:"pointer"}}>
                                    <MdLocalOffer/>
                                    <Text fontWeight={"650"} fontSize={"15px"}>Offers</Text>
                              </Flex>
                        </MenuItem>
                        <MenuItem command='⌘'>
                              <Flex  alignItems={"center"} gap={"10px"} _hover={{color:"red", cursor:"pointer"}}>
                                    <MdHelp/>
                                    <Text fontWeight={"650"} fontSize={"15px"}>Help</Text>
                              </Flex>
                        </MenuItem>
                        
                        </MenuList>
                  </Menu>
              </Flex>
    </Flex>
  )
}

export default Navbar