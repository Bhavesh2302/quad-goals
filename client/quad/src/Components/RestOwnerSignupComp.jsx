import { Box, FormControl, FormLabel, Input, Image, Text, Button } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { restOwnerSignup } from '../Redux/Reducers/UserAuthReducer/action'


const RestOwnerSignupComp = ({show, setShow}) => {

   const dispatch = useDispatch() 

    const [ restOwner, setRestOwner ] = useState({
            phoneNo: "",
            name:"",
            email:"",
            password:"",
            role:"shopOwner"
    }) 

    const handleChange = (e) =>{
          let { name, value} = e.target 

          setRestOwner({
            ...restOwner,
             [name] : value
          })
    } 

  const handleSubmit = (e) =>{
     
        e.preventDefault() 

        const payload = {
            phoneNo: restOwner.phoneNo,
            name:restOwner.name,
            email:restOwner.email,
            password:restOwner.password,
            role:"shopOwner"
        } 

       console.log("owner", payload)
       //setShow(!show)
        dispatch(restOwnerSignup(payload))
        .then((res)=>{
            if(res.type === "REST_OWNER_SIGNUP_SUCCESS")
            {
               setShow(!show)
            }
        })

  }


  return (
    <Box>
        <Box w={"20%"} m={"auto"}>
                 <Link to={"/"}>
                     <Image w={"100%"} src = {"https://i.imgur.com/Gex3smL.jpg"} alt={"logo"}/>
                 </Link>
        </Box>
        <Box w={"40%"}  m={"auto"} mb={"30px"}>
            <Text fontSize={"21px"} fontWeight={"550"}>Be a partner with us and earn more</Text>
        </Box>
        <Box w={"30%"} m={"auto"} mb={"60px"} boxShadow={"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"} p={"30px"}>
            <form onSubmit={handleSubmit}>
                <FormControl>
                    <FormLabel>Owner Name</FormLabel>
                    <Input borderRadius={0} onChange={handleChange} name="name" value={restOwner.name} type={"name"} />
                </FormControl>
                <FormControl>
                    <FormLabel>Phone Number</FormLabel>
                    <Input borderRadius={0} onChange={handleChange} name="phoneNo" value={restOwner.phoneNo} type={"number"}/>
                </FormControl>
                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input borderRadius={0} onChange={handleChange} name="email" value={restOwner.email} type={"email"} />
                </FormControl>
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input borderRadius={0} onChange={handleChange} name="password" value={restOwner.password} type={"password"} />
                </FormControl>
                <Box mt={"15px"}>
                    <Button borderRadius={0} type={"submit"} w={"100%"} bg={"green.500"} color={"white"} _hover={{ color: "black"}}>Register as Restaurant Owner</Button>
                </Box>
            </form>
        </Box>
    </Box>
  )
}

export default RestOwnerSignupComp