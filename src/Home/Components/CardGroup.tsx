import "animate.css";

import { VStack } from "@chakra-ui/react";
import { FC } from "react";
import Education from "./Education";
import Experience from "./Experience";
import Projects from "./Projects";

const CardGroup: FC = () => {
  return (
    <VStack
      spacing={"20px"}
      align={{
        base: "center",
        sm: "center",
        md: "center",
        lg: "flex-start",
      }}
      justify={{
        base: "center",
        sm: "center",
        md: "center",
        lg: "flex-start",
      }}
      paddingLeft="50px"
    >
      <Experience />
      <Education />
      <Projects />
    </VStack>
  );
};

export default CardGroup;
