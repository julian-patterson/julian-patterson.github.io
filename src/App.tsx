import { Box, ChakraProvider } from "@chakra-ui/react";

import Body from "./Components/Body/Body";
import { FC } from "react";
import Header from "./Components/Header/Header";
import theme from "./Styles/Theme";

const App: FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Header />
        <Body />
      </Box>
    </ChakraProvider>
  );
};

export default App;
