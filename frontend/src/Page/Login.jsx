import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  
  
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {NavLink, useNavigate } from "react-router-dom";
import ".././App.css";
import { LogIn } from "../Redux/auth/action";
const init = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(init);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  console.log(auth);

  const handleForm = async (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(LogIn(formData));
  };

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  if (auth.isAuth) {
    navigate("/product");
  }

  return (
    <div>
      <form onSubmit={handleForm} style={{ width: "100%" }}>
        <Container
          maxW="30%"
          backgroundColor="#F0F8FF"
          mt="10"
          borderRadius="10"
          centerContent
          boxShadow="rgba(30, 30, 63, 0.15) 0px 30px 70px -10px, rgba(0, 0, 0, 0.3) 0px 20px 40px -20px, rgba(5, 27, 44, 0.25) 0px -1px 3px 0px inset"

        >
          <Text as='b'  fontSize='3xl' pt={3} color="green">Login</Text>
          <FormControl py="10" maxW="80%">
            <FormLabel fontWeight="700" >
              Email
            </FormLabel>
            <Input
              name="email"
              type="text"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required={true}
              variant="flushed"
              pl="3"
            />
            <FormLabel fontWeight="700" mt="5">
              Password
            </FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                name="password"
                type={show ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
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
            <Button
              colorScheme="green"
              py="5"
              mt="5"
              mb={5}
              type="submit"
              loadingText="Logging in"
            >
              Login
            </Button>
            <Text mb="5" textAlign="center" color="gray.500">
          Already have an account?{" "}
          <NavLink to="/" color="teal.500">
            Signup
          </NavLink>
        </Text>
          </FormControl>
        </Container>
      </form>
    </div>
  );
};

export default Login;
