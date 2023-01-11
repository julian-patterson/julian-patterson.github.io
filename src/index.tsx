import "./index.css";

import AboutMe from "./Components/AboutMe";
import { ChakraProvider } from "@chakra-ui/react";
import Header from "./Components/Header";
import React from "react";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <Header />
      <AboutMe />
    </ChakraProvider>
  </React.StrictMode>
);
