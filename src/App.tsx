import "./App.css";

import AboutMe from "./Components/AboutMe";
import { ChakraProvider } from "@chakra-ui/react";
import { FC } from "react";
import Header from "./Components/Header";

const App: FC = () => {
  return (
    <ChakraProvider>
      <Header />
      <AboutMe />
    </ChakraProvider>
  );
};

export default App;
