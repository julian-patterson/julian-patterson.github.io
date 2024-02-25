import { Box, ChakraProvider } from "@chakra-ui/react";

import { FC } from "react";
import Header from "./Components/Header";
import ProjectsBody from "./Projects/ProjectsBody";
import theme from "./Styles/Theme";

// Home page composed of the header and body. Needed in order to implement the theme
const ProjectsPage: FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Header />
        <ProjectsBody />
      </Box>
    </ChakraProvider>
  );
};

export default ProjectsPage;
