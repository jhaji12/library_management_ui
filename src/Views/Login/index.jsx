import React, { useState } from "react";
import {
  Input,
  Button,
  FormControl,
  FormLabel,
  Flex,
  Box,
  Text,
  Image,
} from "@chakra-ui/react";
import axios from "axios";
import { constants } from "../../constants";
import School from "../../Resources/school.jpg";

const BASE_URL = constants.VITE_APP_API_BASE_URL;

export const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState("");

  const handleLogin = async () => {
    try {
      if (loginType === "Admin") {
        // Redirect to Django admin portal
        window.location.href = `${BASE_URL}/admin`;
      } else if (loginType === "Librarian") {
        const response = await axios.post(`${BASE_URL}/login/`, {
          username,
          password,
        });
        const token = response.data.token;
        localStorage.setItem("token", token);
        onLogin(token);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Flex
      w="100%"
      h="100vh"
      direction={"column"}
      gap={4}
      justifyContent={"center"}
      alignContent={"center"}
      alignItems={"center"}
    >
      <Image src={School} pos="absolute" opacity={"0.3"} />
      <Flex
        w="600px"
        h="50vh"
        p="20px"
        backgroundColor="white"
        border="1px dashed"
        borderRadius="20px"
        borderColor={"gray"}
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        position={"relative"}
      >
        <Text variant="body1semiBold">Library Management System</Text>
        <Text mt={4} align={"center"} variant={"body3semiBold"}>
          Select Login Type
        </Text>
        <Flex
          w="100%"
          h="100%"
          direction={"column"}
          gap={4}
          justifyContent={"center"}
          alignContent={"center"}
        >
          <FormControl>
            <Flex justifyContent={"space-evenly"} alignItems={"center"}>
              <Button
                variant={loginType === "Admin" ? "solid" : "outline"}
                colorScheme="blue"
                onClick={() => setLoginType("Admin")}
              >
                Admin
              </Button>
              <Button
                variant={loginType === "Librarian" ? "solid" : "outline"}
                colorScheme="blue"
                onClick={() => setLoginType("Librarian")}
              >
                Librarian
              </Button>
            </Flex>
          </FormControl>
          {loginType === "Librarian" && ( // Render username and password fields only for Librarian login
            <>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
            </>
          )}
          <Button onClick={handleLogin}>Login</Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
