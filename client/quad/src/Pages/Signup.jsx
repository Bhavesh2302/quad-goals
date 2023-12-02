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
  InputGroup
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userSignup } from "../Redux/Reducers/UserAuthReducer/action";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const Signup = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const dispatch = useDispatch();
  const userSignupToast = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    phoneNo: "",
    password: ""
  });
  const handleChangeSignup = (e) => {
    let { name, value } = e.target;
    setSignupForm({
      ...signupForm,
      [name]: value
    });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    const payload = {
      name: signupForm.name,
      email: signupForm.email,
      phoneNo: Number(signupForm.phoneNo),
      password: signupForm.password
    };
    console.log(payload);
    dispatch(userSignup(payload));
    userSignupToast({
      title: "Signup Successful",
      status: "success",
      duration: 2000,
      position: "top",
      isClosable: true
    });
  };

  return (
    <>
      <Button
        ref={btnRef}
        bg={"black"}
        color={"white"}
        borderRadius={"0px"}
        _hover={{ color: "black", bg: "white" }}
        onClick={onOpen}
      >
        Signup
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={{ base: "xs", sm: "xs", md: "sm" }}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader
            fontSize={"30px"}
            pl={{ base: "15px", sm: "15px", md: "20px", lg: "50px" }}
          >
            Signup
          </DrawerHeader>
          <DrawerBody pl={{ base: "15px", sm: "15px", md: "20px", lg: "50px" }}>
            <form onSubmit={handleSignup}>
              <FormControl isRequired>
                <Box mb={"20px"}>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type={"text"}
                    w={"90%"}
                    name={"name"}
                    value={signupForm.name}
                    onChange={handleChangeSignup}
                    borderRadius={"0px"}
                    variant={"filled"}
                  />
                </Box>
              </FormControl>
              <FormControl isRequired>
                <Box mb={"20px"}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type={"email"}
                    w={"90%"}
                    name={"email"}
                    value={signupForm.email}
                    onChange={handleChangeSignup}
                    borderRadius={"0px"}
                    variant={"filled"}
                  />
                </Box>
              </FormControl>
              <FormControl isRequired>
                <Box mb={"20px"}>
                  <FormLabel>Mobile Number</FormLabel>
                  <Input
                    type={"number"}
                    w={"90%"}
                    name={"phoneNo"}
                    value={signupForm.phoneNo}
                    onChange={handleChangeSignup}
                    borderRadius={"0px"}
                    variant={"filled"}
                  />
                </Box>
              </FormControl>
              <FormControl isRequired>
                <Box mb={"20px"}>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      w={{ base: "70%", sm: "70%", md: "75%", lg: "80%" }}
                      name={"password"}
                      value={signupForm.password}
                      onChange={handleChangeSignup}
                      borderRadius={"0px"}
                      variant={"filled"}
                    />
                    <Button
                      variant={"solid"}
                      borderRadius={"0px"}
                      w="22px"
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputGroup>
                </Box>
              </FormControl>
              <Box mb={"20px"}>
                <Button
                  w="90%"
                  type={"submit"}
                  bg={"#5aa02c"}
                  color={"white"}
                  _hover={{ bg: "#ef234b" }}
                  borderRadius={"0px"}
                >
                  Submit
                </Button>
              </Box>
            </form>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Signup;
