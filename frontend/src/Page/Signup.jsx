import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const usenavigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const toast = useToast();

  const handleSubmit = async () => {
    const payload = { username, email, password };

    try {
      let res = await axios.post("http://localhost:8080/user/register", payload);
      let message = res.data;
      if (typeof res.data === 'object') {
        message = JSON.stringify(res.data);
      }

      if (message === "User already exists") {
        toast({
          description: message,
          position: "top",
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
        return;
      }

      toast({
        description: "Signup successfully!",
        position: "top",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      usenavigate("/login");
    } catch (err) {
      toast({
        position:"top",
        description: "Invalid Data",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      console.log(err);
    }
  };

  return (
    <div>
      <Heading mb="5">Sign Up Page</Heading>
      <Box
        margin="auto"
        w="30%"
        mb="10"
        borderRadius="10"
        padding="10px"
        boxShadow="rgba(30, 30, 63, 0.15) 0px 30px 70px -10px, rgba(0, 0, 0, 0.3) 0px 20px 40px -20px, rgba(5, 27, 44, 0.25) 0px -1px 3px 0px inset"
      >
        <FormControl maxW="80%" margin="auto">
          <FormLabel fontWeight={"bold"} mt="10">
            Username
          </FormLabel>
          <Input
            type="text"
            variant="flushed"
            placeholder="Enter Username"
            pl="3"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl maxW="80%" margin="auto">
          <FormLabel fontWeight={"bold"} mt="10">
            Email
          </FormLabel>
          <Input
            type="email"
            variant="flushed"
            placeholder="Enter Email"
            pl="3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl maxW="80%" margin="auto">
          <FormLabel fontWeight={"bold"} mt="10">
            Password
          </FormLabel>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              name="password"
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              variant="flushed"
              pl="3"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button
          size="md"
          px={8}
          colorScheme="green"
          variant={"solid"}
          marginTop="10"
          mb="10"
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
      </Box>
    </div>
  );
};

export default SignUp;
