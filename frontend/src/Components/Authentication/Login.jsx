import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  Button,
} from "@chakra-ui/react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    setLoading(true);
    if (!email || !password) {
      console.log("fields missing");
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        {
          email,
          password,
        },
        config
      );
      console.log(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <VStack spacing={"5px"}>
      <FormControl id="login-email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="login-password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size={"md"}>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement w={"4.5rem"}>
            <Button
              h={"1.75rem"}
              size={"sm"}
              onClick={(e) => setShowPassword((show) => !show)}
            >
              {showPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        isLoading={loading}
        colorScheme="blue"
        w={"100%"}
        marginTop={"15px"}
        onClick={() => submitHandler()}
      >
        Login
      </Button>
      <Button
        variant={"solid"}
        colorScheme="red"
        w={"100%"}
        marginTop={"15px"}
        onClick={() => {
          setEmail("guestuser@chatty.in");
          setPassword("guestUserPassword");
        }}
      >
        Guest User
      </Button>
    </VStack>
  );
};

export default Login;
