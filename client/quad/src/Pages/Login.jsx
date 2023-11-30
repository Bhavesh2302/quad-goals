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
import { userLogin } from "../Redux/Reducers/UserAuthReducer/action";
import { useLocation, useNavigate } from "react-router-dom";
import Signup from "./Signup";
import InputField from "../BaseComponents/InputField";

const Login = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userSignupToast = useToast();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const [signupForm, setSignupForm] = useState({
    email: "",
    password: ""
  });

  const handleChangeLogin = (e) => {
    let { name, value } = e.target;
    setSignupForm({
      ...signupForm,
      [name]: value
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const payload = {
      email: signupForm.email,
      password: signupForm.password
    };

    dispatch(userLogin(payload)).then((res) => {
      if (res.type === "USER_LOGIN_SUCCESS") {
        userSignupToast({
          title: "Login Successful",
          status: "success",
          duration: 1500,
          position: "top",
          isClosable: true
        });
        if (res?.payload?.user?.role === "shopOwner")
          navigate("/shopownerdashboard");
      } else
        userSignupToast({
          title: "Login Fail",
          description: "Please Check your login cridentials",
          status: "error",
          duration: 1500,
          position: "top",
          isClosable: true
        });
    });
  };

  return (
    <>
      <Button
        ref={btnRef}
        fontWeight={"650"}
        variant={"unstyled"}
        border={"0px"}
        color={"black"}
        borderRadius={"0px"}
        fontSize={
          location?.pathname === "/"
            ? { base: "11px", sm: "11px", md: "16px", lg: "18px" }
            : { base: "12px", sm: "15px", md: "15px", lg: "15px" }
        }
        _hover={{ color: "red", cursor: "pointer" }}
        onClick={onOpen}
        p="0"
      >
        Login
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
            Login
          </DrawerHeader>
          <DrawerBody pl={{ base: "15px", sm: "15px", md: "20px", lg: "50px" }}>
            <form onSubmit={handleLogin}>
              <Box>
                <InputField
                  type="email"
                  w="100%"
                  title="Email"
                  name="email"
                  value={signupForm.email}
                  onChange={handleChangeLogin}
                  variant="filled"
                />
              </Box>
              <Box>
                <InputField
                  type={showPassword ? "text" : "password"}
                  value={signupForm.password}
                  onChange={handleChangeLogin}
                  name="password"
                  borderRadius={"0px"}
                  variant={"filled"}
                  h={{ base: "30px", sm: "30px", md: "40px", lg: "45px" }}
                  setShowPassword={setShowPassword}
                  showPassword={showPassword}
                  showPasswordField
                />
              </Box>
              <Box mb={"20px"}>
                <Button
                  type={"submit"}
                  bg={"#5aa02c"}
                  w="100%"
                  color={"white"}
                  _hover={{ bg: "#ef234b" }}
                  borderRadius={"0px"}
                  h={{ base: "30px", sm: "30px", md: "40px", lg: "45px" }}
                >
                  Submit
                </Button>
              </Box>
            </form>
            <Box w={"100%"} textAlign="center" fontWeight="550">
              <Text
                fontSize={{ base: "12px", sm: "12px", md: "14px", lg: "15px" }}
              >
                New to foodie?
              </Text>
              <Signup />
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Login;
