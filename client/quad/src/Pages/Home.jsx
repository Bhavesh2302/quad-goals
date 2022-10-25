import { Box, Image, Flex, Button, Text, Input} from '@chakra-ui/react'
import React from 'react'

const Home = () => {
  return (
    <Flex w={"100%"} m={"auto"} >
      <Box w={"52%"}  pl={"150px"} pt={"80px"} pr={"40px"}>
           <Flex  alignItems={"center"} justifyContent={"space-between"} p={"0px"} mb={"40px"}>
                <Box  w={"155px"} >
                    <Image objectFit={"fill"} h={"105px"} w={"100%"} borderRadius={"50%"} src={"https://i.imgur.com/Gex3smL.jpg"} alt={"Logo"}/>
                </Box>
                <Flex gap={"15px"} >
                    <Button bg={"white"} borderRadius={"0px"} _hover={{ color:"black", bg: "white", border: "1px solid #eee" }}>Login</Button>
                    <Button bg={"black"} color={"white"} borderRadius={"0px"} _hover={{ color:"black", bg: "white"}}>Signup</Button>
                </Flex>
           </Flex>
           <Box textAlign={"left"}>
                <Box fontSize={"40px"} fontWeight={"bold"} mb={"12px"}>
                    <Text>Hungry?</Text>
                </Box>
                <Box fontSize={"18px"} fontWeight={"bold"} color={"gray"}>
                    <Text>Order food from favourite restaurants near you.</Text>
                </Box>
           </Box>
           <Flex mt={"25px"}>
                <Input  border={"2px solid #969491"} h={"50px"} borderRadius={"0px"} placeholder={"Enter your delivery location"}/>
                <Button h={"50px"}  borderRadius={"0px"} color={"white"} bg={"#ef234b "}>Find Food</Button>
           </Flex>
           <Box textAlign={"left"} mt={"20px"} mb={"20px"}>
             <Text fontSize={"16px"} color={"gray"} fontWeight={"500"} mb={"12px"}>Popular cities in India</Text>
             <Flex gap={"10px"} fontSize={"15px"} fontWeight={"500"} flexWrap={"wrap"}>
                 <Text color={"#bdb3b6"}>Mumbai</Text>
                 <Text color={"#969491"}>Delhi</Text>
                 <Text color={"#bdb3b6"}>Gurgaon</Text>
                 <Text color={"#969491"}>Pune</Text>
                 <Text color={"#bdb3b6"}>Kolkata</Text>
                 <Text color={"#969491"}>Hyderabad</Text>            
                 <Text color={"#bdb3b6"}>Chennai</Text>
                 <Text color={"#969491"}>Bangalore</Text>
                 <Text color={"#969491"}>& more.</Text>
             </Flex>
           </Box>
      </Box>
      <Box w={"48%"}>
          <Image src={"/brooke-lark-HlNcigvUi4Q-unsplash.jpg"} alt={"cover"}/>
      </Box>
    </Flex>
  )
}

export default Home