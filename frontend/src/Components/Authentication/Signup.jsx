import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { ChatState } from "../../Context/ChatProvider";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [picture, setPicture] = useState();
  const [loading, setLoading] = useState();
  const toast = useToast();
  // const navigate = useNavigate();
  const { user, setUser } = ChatState();

  // useEffect(() => {
  //   if (user) {
  //     navigate("/chats");
  //   }
  // }, [user]);

  const URL = "https://api.cloudinary.com/v1_1/dsiwgomkc/image/upload";

  const postDetails = (picture) => {
    setLoading(true);
    if (picture === undefined) {
      toast({
        colorScheme: "red",
        title: "Please select an image",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      console.log("please select an image");
      setLoading(false);
      return;
    }

    if (picture.type === "image/jpeg" || picture.type === "image/png") {
      const data = new FormData();
      data.append("file", picture);
      data.append("upload_preset", "chatty");
      data.append("cloud_name", "dsiwgomkc");
      fetch("https://api.cloudinary.com/v1_1/dsiwgomkc/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPicture(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        colorScheme: "red",
        title: "Please select an image",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      console.log("please select an image");
      setLoading(false);
    }
    return;
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!name || !password || !confirmPassword || !email) {
      toast({
        colorScheme: "red",
        title: "Please fill all the Required Fields",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      console.log("please fill all fields");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast({
        colorScheme: "red",
        title: "Confirm password doesn't match",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      console.log("confirm password doesnt match");
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
        "https://chatty-2ikm.onrender.com/api/user",
        {
          name,
          email,
          password,
          picture,
        },
        config
      );
      console.log(data);
      toast({
        colorScheme: "green",
        title: "User registered",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      console.log("user registered");
      setLoading(false);
      localStorage.setItem(`userInfo`, JSON.stringify(data));
      setUser(data);
      // navigate("/chats");
    } catch (err) {
      toast({
        colorScheme: "red",
        title: "Error occured",
        description: err.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      console.log("error occcured");
      setLoading(false);
    }
  };

  return (
    <VStack spacing={"5px"}>
      <FormControl isRequired id="name">
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
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
      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size={"md"}>
          <Input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Your Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightElement w={"4.5rem"}>
            <Button
              h={"1.75rem"}
              size={"sm"}
              onClick={(e) => setShowConfirmPassword((show) => !show)}
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="picture">
        <FormLabel>Upload Your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>

      <Button
        colorScheme="blue"
        w={"100%"}
        marginTop={"15px"}
        onClick={(e) => submitHandler()}
        isLoading={loading}
      >
        Sign up
      </Button>
    </VStack>
  );
};

export default Signup;
