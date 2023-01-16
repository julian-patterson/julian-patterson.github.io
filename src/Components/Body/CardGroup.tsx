import "animate.css";

import Cad from "./Cards/Cad";
import Education from "./Cards/Education";
import { FC } from "react";
import Introduction from "./Cards/Introduction";
import Projects from "./Cards/Projects";
import { VStack } from "@chakra-ui/react";

const CardGroup: FC = () => {
  return (
    <VStack spacing={"20px"}>
      <Introduction />
      <Education />
      <Projects />
      <Cad />
    </VStack>
  );
};

export default CardGroup;
