import { Box, Center, VStack } from "@chakra-ui/react";

import CardGroup from "./CardGroup";
import { FC } from "react";
import Typed from "react-typed";

const Body: FC = () => {
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
            strings={["Here is a little about me:", "Scroll to see more"]}
            typeSpeed={100}
            loop={true}
            backDelay={1000}
          />
          <VStack spacing={"100px"} paddingTop={"400px"}>
            <CardGroup />
          </VStack>
        </VStack>
      </Center>
    </Box>
  );
};

export default Body;
