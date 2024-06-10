import { Button, HStack, Text, Image, Box, Spacer } from "@chakra-ui/react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { LogOut } from "../Redux/auth/action";

const Navbar = () => {
  const { isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(LogOut());
  };

  return (
    <HStack
      backgroundColor="#2F855A"
      alignItems="center"
      paddingRight={20}
      paddingLeft={20}
      py="5"
    >
      <Box>
        <NavLink to="/product">
          <Image src="https://cl.kryzen.com/assets/kryzen-logo.png" alt="Logo" width="90px" />
        </NavLink>
      </Box>

      <Spacer />
      <HStack spacing="20px">
        <Text
          fontSize="16px"
          fontWeight="500"
          p="7px 13px"
          textDecoration="none"
          color="#FFF"
        >
          {isAuth ? "" : <NavLink to="/">Signup</NavLink>}
        </Text>
        <Text
          fontSize="16px"
          fontWeight="500"
          p="7px 13px"
          textDecoration="none"
          color="#FFF"
        >
          {isAuth ? (
            <Button onClick={handleLogOut}>Log Out</Button>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </Text>
        <Text
          fontWeight="500"
          p="7px 13px"
          textDecoration="none"
          color="#FFF"
          fontSize="16px"
        >
          <NavLink to="/product">Product</NavLink>
        </Text>
      </HStack>
    </HStack>
  );
};

export default Navbar;
