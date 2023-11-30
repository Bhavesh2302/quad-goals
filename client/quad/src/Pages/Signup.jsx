import {
  Box,
  Drawer,
  useDisclosure,
  DrawerOverlay,
  Button,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useToast,
  Text
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userSignup } from "../Redux/Reducers/UserAuthReducer/action";
import InputField from "../BaseComponents/InputField";
import Login from "./Login";

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
      duration: 1500,
      position: "top"
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
        h={{ base: "30px", sm: "30px", md: "40px", lg: "45px" }}
        fontSize={{ base: "12px", sm: "12px", md: "14px", lg: "15px" }}
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
            pl={{ base: "15px", sm: "15px", md: "20px", lg: "50px" }}
            fontSize={{ base: "18px", sm: "18px", md: "20px", lg: "30px" }}
          >
            Signup
          </DrawerHeader>
          <DrawerBody pl={{ base: "15px", sm: "15px", md: "20px", lg: "50px" }}>
            <form onSubmit={handleSignup}>
              <Box>
                <InputField
                  type={"text"}
                  w={"100%"}
                  name={"name"}
                  value={signupForm.name}
                  onChange={handleChangeSignup}
                  borderRadius={"0px"}
                  variant={"filled"}
                  title={"Name"}
                />
              </Box>
              <Box>
                <InputField
                  title={"Email"}
                  type={"email"}
                  w={"100%"}
                  name={"email"}
                  value={signupForm.email}
                  onChange={handleChangeSignup}
                  borderRadius={"0px"}
                  variant={"filled"}
                />
              </Box>
              <Box>
                <InputField
                  title="Mobile Number"
                  type={"number"}
                  w={"100%"}
                  name={"phoneNo"}
                  value={signupForm.phoneNo}
                  onChange={handleChangeSignup}
                  borderRadius={"0px"}
                  variant={"filled"}
                />
              </Box>
              <Box>
                <InputField
                  title="Password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={signupForm.password}
                  onChange={handleChangeSignup}
                  borderRadius={"0px"}
                  variant={"filled"}
                  h={{ base: "30px", sm: "30px", md: "40px", lg: "45px" }}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  showPasswordField
                />
              </Box>
              <Box mb={"20px"}>
                <Button
                  w="100%"
                  type={"submit"}
                  bg={"#5aa02c"}
                  color={"white"}
                  _hover={{ bg: "#ef234b" }}
                  borderRadius={"0px"}
                  h={{ base: "30px", sm: "30px", md: "40px", lg: "45px" }}
                >
                  Submit
                </Button>
              </Box>
            </form>
            <Box w="100%" textAlign="center">
              <Text
                fontSize={{ base: "12px", sm: "12px", md: "14px", lg: "15px" }}
              >
                Already a user?
              </Text>
              <Login />
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Signup;
