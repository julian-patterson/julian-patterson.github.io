import { Box, ChakraProvider } from "@chakra-ui/react";

import AboutMe from "./Blocks/AboutMe";
import { FC } from "react";
import Header from "./Blocks/Header";

const App: FC = () => {
  return (
    <ChakraProvider>
      <Box>
        <Header />
        <AboutMe />
      </Box>
    </ChakraProvider>
  );
};

export default App;
