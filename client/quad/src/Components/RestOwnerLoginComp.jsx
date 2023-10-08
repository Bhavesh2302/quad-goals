import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Image,
  Text,
  Button,
  InputGroup
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../Redux/Reducers/UserAuthReducer/action";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const RestOwnerLoginComp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [restOwner, setRestOwner] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    let { name, value } = e.target;

    setRestOwner({
      ...restOwner,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      email: restOwner.email,
      password: restOwner.password
    };

    dispatch(userLogin(payload)).then((res) => {
      if (res.type === "USER_LOGIN_SUCCESS") {
        navigate("/shopownerdashboard");
      }
    });
  };

  return (
    <Box>
      <Box w={{ base: "50%", sm: "40%", md: "30%", lg: "20%" }} m={"auto"}>
        <Link to={"/"}>
          <Image
            w={"100%"}
            src={"https://i.imgur.com/Gex3smL.jpg"}
            alt={"logo"}
          />
        </Link>
      </Box>
      <Box
        w={{ base: "90%", sm: "70%", md: "50%", lg: "40%" }}
        m={"auto"}
        mb={"30px"}
      >
        <Text fontSize={"21px"} fontWeight={"550"}>
          Be a partner with us and earn more
        </Text>
      </Box>
      <Box
        w={{ base: "85%", sm: "70%", md: "50%", lg: "30%" }}
        m={"auto"}
        mb={"60px"}
        boxShadow={"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}
        p={"30px"}
      >
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              borderRadius={0}
              onChange={handleChange}
              name="email"
              value={restOwner.email}
              type={"email"}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                borderRadius={0}
                onChange={handleChange}
                name="password"
                value={restOwner.password}
              />
              <Button
                variant={"solid"}
                borderRadius={"0px"}
                onClick={() => setShowPassword((showPassword) => !showPassword)}
              >
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputGroup>
          </FormControl>
          <Box mt={"15px"}>
            <Button
              borderRadius={0}
              type={"submit"}
              w={"100%"}
              bg={"green.500"}
              color={"white"}
              _hover={{ color: "black" }}
            >
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default RestOwnerLoginComp;
