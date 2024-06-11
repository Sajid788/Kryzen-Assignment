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
      backgroundColor="PowderBlue"
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
          fontWeight="500"
          p="7px 13px"
          textDecoration="none"
          color="#4AAB3D"
          fontSize="16px"
        >
          <NavLink to="/product">Product</NavLink>
        </Text>
        <Text
          fontSize="16px"
          fontWeight="500"
          p="7px 13px"
          textDecoration="none"
          color="#4AAB3D"
        >
          {isAuth ? "" : <NavLink to="/">Signup</NavLink>}
        </Text>
        <Text
          fontSize="16px"
          fontWeight="500"
          p="7px 13px"
          textDecoration="none"
          color="#4AAB3D"
        >
          {isAuth ? (
            <Button onClick={handleLogOut}>Log Out</Button>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </Text>
       
      </HStack>
    </HStack>
  );
};

export default Navbar;
