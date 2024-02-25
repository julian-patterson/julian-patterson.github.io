import "animate.css";

import { VStack } from "@chakra-ui/react";
import { FC } from "react";
import Education from "./Education";
import Experience from "./Experience";
import Introduction from "./Introduction";
import Projects from "./Projects";

const CardGroup: FC = () => {
  return (
    <VStack spacing={"20px"}>
      <Introduction />
      <Education />
      <Projects />
      <Experience />
    </VStack>
  );
};

export default CardGroup;
