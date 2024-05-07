import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Overview, Books, Members, LoginForm } from "./Views";
import { Box, Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Appbar, Sidebar } from "./Components";

const App = () => {
  const [activeState, setActiveState] = useState(window.location.pathname);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if token is present in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(!!token);
    }
  }, []); // Empty dependency array to run only once on component mount

  const handleLogin = (token) => {
    // Store the token in localStorage
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
    <Navigate to="/overview" />;
  };

  const handleLogout = () => {
    // Clear user-related data from localStorage or state
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    return <Navigate to="/login" />;
  };

  return (
    <Box bg="framebg">
      {isLoggedIn ? (
        <>
          <Appbar />
          <Flex>
            <Sidebar
              activeState={activeState}
              setActiveState={setActiveState}
              handleLogout={handleLogout}
            />
            <Box flex={1}>
              <Routes>
                <Route path="/overview" element={<Overview />} />
                <Route path="/books" element={<Books />} />
                <Route path="/Members" element={<Members />} />
                <Route path="*" element={<Navigate to="/overview" />} />
                <Route path="/logout" element={handleLogout} />
              </Routes>
            </Box>
          </Flex>
        </>
      ) : (
        <Routes>
          <Route path="*" element={<LoginForm onLogin={handleLogin} />} />
        </Routes>
      )}
    </Box>
  );
};

export default App;
