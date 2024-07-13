import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, HashRouter as Router, } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import App from "./App.jsx";
import { theme } from "./Themes/index";

const root = createRoot(document.getElementById("root"));

root.render(
  <Router>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </Router>
);
