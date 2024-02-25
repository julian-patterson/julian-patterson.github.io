import "animate.css";

import { VStack } from "@chakra-ui/react";
import { FC } from "react";
import Cad from "./Cards/Cad";
import Education from "./Cards/Education";
import Introduction from "./Cards/Introduction";
import Projects from "./Cards/Projects";

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
