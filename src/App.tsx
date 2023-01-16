import { Box, ChakraProvider } from "@chakra-ui/react";

import { FC } from "react";
import Header from "./Components/Header/Header";
import Introduction from "./Components/Introduction/Introduction";
import theme from "./Styles/Theme";

const App: FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Header />
        <Introduction />
      </Box>
    </ChakraProvider>
  );
};

export default App;
