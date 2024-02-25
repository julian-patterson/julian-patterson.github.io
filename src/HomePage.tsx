import { Box, ChakraProvider } from "@chakra-ui/react";

import { FC } from "react";
import Header from "./Components/Header";
import HomeBody from "./Home/HomeBody";
import theme from "./Styles/Theme";

// Home page composed of the header and body. Needed in order to implement the theme
const Home: FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Header />
        <HomeBody />
      </Box>
    </ChakraProvider>
  );
};

export default Home;
