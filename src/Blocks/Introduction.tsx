import { Box, Center, VStack } from "@chakra-ui/react";

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
        </VStack>
      </Center>
    </Box>
  );
};

export default Introduction;
