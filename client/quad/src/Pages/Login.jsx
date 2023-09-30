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
  InputGroup,
  FormLabel,
  useToast,
  }
  from '@chakra-ui/react'
  import React from 'react'
  import { useState } from 'react'
  import { useDispatch } from "react-redux"
  import { userLogin } from '../Redux/Reducers/UserAuthReducer/action'
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  
  const Login = () => {
      const { isOpen, onOpen, onClose } = useDisclosure()
      const btnRef = React.useRef()
      const dispatch = useDispatch()
      const userSignupToast = useToast()
      const [showPassword, setShowPassword] = useState(false);
  
  
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

         dispatch(userLogin(payload))
         .then((res)=>{
          console.log("insideFunc", res)
            if(res.type === "USER_LOGIN_SUCCESS")
            {
                userSignupToast({
                  title: "Login Successful",
                  status: "success",
                  duration: 1500,
                  position:"top",
                  isClosable : true
             });
            }
            else{
              userSignupToast({
                  title: "Login Fail",
                  description : "Please Check login cridentials",
                  status: "error",
                  duration: 1500,
                  position:"top",
                  isClosable : true
             });
            }
         })
         
      }
  
    return (
      <>
         <Button ref={btnRef} fontWeight={"650"} variant={"unstyled"} border={"0px"} color={"black"} borderRadius={"0px"} fontSize={{base:"10px", sm:"11px", md:"15px"}}  _hover={{ color:"black", bg: "white"}} onClick={onOpen}>
          Login
        </Button>
        <Drawer
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
          finalFocusRef={btnRef}
          size={{base:"xs", sm: "xs", md:"sm"}}
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
                                  {/* <Input type={"password"} w={"60%"} name={"password"} value={signupForm.password} onChange={handleChangeLogin} borderRadius={"0px"} variant={"filled"} /> */}
                                  <InputGroup>
                <Input type={showPassword ? 'text' : 'password'}
                w={"50%"}
                name={"password"}
                value={signupForm.password}
                onChange={handleChangeLogin}
                borderRadius={"0px"}
                variant={"filled"}
                />
                  <Button
                    variant={'solid'}
                    borderRadius={"0px"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
              </InputGroup>
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