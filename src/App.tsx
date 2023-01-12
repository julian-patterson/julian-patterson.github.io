import { Box, ChakraProvider } from "@chakra-ui/react";

import { FC } from "react";
import Header from "./Blocks/Header";
import Introduction from "./Blocks/Introduction";
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
