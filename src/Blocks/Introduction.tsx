import "animate.css";

import { Box, Center, VStack } from "@chakra-ui/react";

import { AnimationOnScroll } from "react-animation-on-scroll";
import { FC } from "react";
import Typed from "react-typed";

const Introduction: FC = () => {
  return (
    <Box paddingTop={"100px"}>
      <Center>
        <VStack spacing={0.25}>
          <Typed
            style={{ fontWeight: "Bold", fontSize: "30px" }}
            strings={["Hello, my name is Julian!"]}
            typeSpeed={100}
            backDelay={100}
          />
          <Typed
            style={{ fontWeight: "Thin", fontSize: "30px" }}
            strings={["Here is all about me:"]}
            typeSpeed={100}
            startDelay={3500}
            backDelay={100}
          />
          <AnimationOnScroll
            animateIn="animate__animated animate__slideInUp"
            animatePreScroll={false}
          >
            <h2>Test</h2>
          </AnimationOnScroll>
          <Box paddingTop={"1000px"}></Box>
        </VStack>
      </Center>
    </Box>
  );
};

export default Introduction;
