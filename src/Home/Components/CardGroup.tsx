import "animate.css";

import { VStack } from "@chakra-ui/react";
import { FC } from "react";
import Education from "./Education";
import Experience from "./Experience";
import Projects from "./Projects";

const CardGroup: FC = () => {
  return (
    <VStack spacing={"20px"} align="flex-start" justify="flex-start">
      <Experience />
      <Education />
      <Projects />
    </VStack>
  );
};

export default CardGroup;
