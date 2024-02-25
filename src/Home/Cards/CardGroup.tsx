import "animate.css";

import Cad from "./Cad";
import Education from "./Education";
import { FC } from "react";
import Introduction from "./Introduction";
import Projects from "./Projects";
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
