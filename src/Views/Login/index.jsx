import React, { useState } from "react";
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  FormControl,
  FormLabel,
  Flex,
  Box,
  Text,
  Image,
  IconButton,
} from "@chakra-ui/react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { constants } from "../../constants";
import School from "../../Resources/school.jpg";

const BASE_URL = constants.VITE_APP_API_BASE_URL;

export const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
        const school_level = response.data.school_level;
        localStorage.setItem("token", token);
        localStorage.setItem("school_level", school_level);
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
          {loginType === "Librarian" && (
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
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement>
                    <IconButton
                      variant="outlined"
                      icon={showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </>
          )}
          <Button onClick={handleLogin}>Login</Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
