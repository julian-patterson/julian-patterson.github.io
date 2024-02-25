import { Box, ChakraProvider } from "@chakra-ui/react";

import EducationBody from "./Education/EducationBody";
import { FC } from "react";
import Header from "./Components/Header";
import theme from "./Styles/Theme";

// Home page composed of the header and body. Needed in order to implement the theme
const EducationPage: FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Header />
        <EducationBody />
      </Box>
    </ChakraProvider>
  );
};

export default EducationPage;
