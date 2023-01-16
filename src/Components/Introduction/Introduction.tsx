import { Box, Center, VStack } from "@chakra-ui/react";

import CardGroup from "./CardGroup";
import { FC } from "react";
import Typed from "react-typed";

const Introduction: FC = () => {
  return (
    <Box paddingTop={"200px"} paddingBottom={"500px"}>
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
            strings={["Here is a little about me:"]}
            typeSpeed={100}
            startDelay={3500}
            backDelay={100}
          />
          <VStack spacing={"100px"} paddingTop={"400px"}>
            <CardGroup />
          </VStack>
        </VStack>
      </Center>
    </Box>
  );
};

export default Introduction;
