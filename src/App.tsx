import { Box, ChakraProvider } from "@chakra-ui/react";

import AboutMe from "./Blocks/AboutMe";
import { FC } from "react";
import Header from "./Blocks/Header";
import theme from "./Styles/Theme";

const App: FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Header />
        <AboutMe />
      </Box>
    </ChakraProvider>
  );
};

export default App;
