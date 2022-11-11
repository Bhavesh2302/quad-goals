import { 
  Box, 
  Drawer,
  useDisclosure,
  DrawerOverlay,
  Button,
  DrawerContent,
  DrawerFooter,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Input,
  FormControl,
  FormLabel,
  useToast,
  }
  from '@chakra-ui/react'
  import React from 'react'
  import { useState } from 'react'
  import { useDispatch } from "react-redux"
  import { userLogin } from '../Redux/Reducers/UserAuthReducer/action'
  
  const Login = () => {
      const { isOpen, onOpen, onClose } = useDisclosure()
      const btnRef = React.useRef()
      const dispatch = useDispatch()
      const userSignupToast = useToast()
  
  
      const [ signupForm, setSignupForm ] = useState({
          email:"",
          password:""
      })
      const handleChangeLogin =(e)=>{
          let { name, value } = e.target 
           setSignupForm({
              ...signupForm,
              [name]: value
           })
  
      }
  
  
      const handleLogin =(e)=>{
         e.preventDefault(); 
  
         const payload = {
             email: signupForm.email,
             password: signupForm.password
         } 
         console.log(payload)
         dispatch( userLogin(payload)) 
         userSignupToast({
            title: "Login Successful",
            status: "success",
            duration: 1500,
            position:"top"
         });
      }
  
    return (
      <>
         <Button ref={btnRef} fontWeight={"650"} variant={"unstyled"} border={"0px"} color={"black"} borderRadius={"0px"} _hover={{ color:"black", bg: "white"}} onClick={onOpen}>
          Login
        </Button>
        <Drawer
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
          finalFocusRef={btnRef}
          size={"md"}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader fontSize={"30px"}>Login</DrawerHeader>
  
            <DrawerBody pl={"50px"}>
                      <form onSubmit={handleLogin}>
                        
                        <FormControl isRequired>
                              <Box mb={"20px"}>
                                  <FormLabel>Email</FormLabel>
                                  <Input type={"email"} w={"60%"} name={"email"} value={signupForm.email} onChange={handleChangeLogin} borderRadius={"0px"} variant={"filled"} />
                              </Box>
                        </FormControl>
                        <FormControl isRequired>
                              <Box mb={"20px"}>
                                  <FormLabel>Password</FormLabel>
                                  <Input type={"password"} w={"60%"} name={"password"} value={signupForm.password} onChange={handleChangeLogin} borderRadius={"0px"} variant={"filled"} />
                              </Box>
                        </FormControl> 
                        <Box mb={"20px"}>
                          <Button type={"submit"} w={"60%"} bg={"#5aa02c"} color={"white"} _hover={{bg:"#ef234b"}} borderRadius={"0px"}>Submit</Button>
                        </Box> 
                      </form>   
            </DrawerBody>
  
            <DrawerFooter>
              <Button variant='outline' mr={3} onClick={onClose}>
                Cancel
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
  }
  
  export default Login