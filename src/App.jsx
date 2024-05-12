import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Overview, Books, Members, LoginForm } from "./Views";
import { Box, Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Appbar, Sidebar } from "./Components";

const App = () => {
  const location = useLocation();
  const [activeState, setActiveState] = useState(location.pathname.split("/").pop() || "/overview");
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
    <Navigate to="/login" />;
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
                <Route path="/C:/overview" element={<Overview />} />
                <Route path="/C:/books" element={<Books />} />
                <Route path="/C:/members" element={<Members />} />
                <Route path="*" element={<Overview />} />
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
