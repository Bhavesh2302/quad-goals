import { Box, Button } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import RestOwnerLoginComp from '../Components/RestOwnerLoginComp'
import RestOwnerSignupComp from "../Components/RestOwnerSignupComp"

 

const RestOwnerSignup = () => {
  
   const [ show, setShow ] = useState(false) 

   const handleShowToggle = () =>{
       setShow(!show)
   }


  return (
    <Box>
        {
            !show ? <RestOwnerSignupComp show={show} setShow={setShow}/> : <RestOwnerLoginComp show={show} setShow={setShow}/>
        } 
        <Box mb={"20px"}>
           <Button variant={"unstyled"} onClick={handleShowToggle}>{ !show ? "Already Restaurant Owner? Login" : "Not registered yet? Register"}</Button>
        </Box> 
    </Box>
  )
}

export default RestOwnerSignup