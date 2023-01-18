import { Box, Center, VStack } from "@chakra-ui/react";

import CardGroup from "./CardGroup";
import { FC } from "react";
import Typed from "react-typed";

//Body of the website, everything other than the heading
const Body: FC = () => {
  const boldTypedStyle = {
    fontWeight: "Bold",
    fontSize: "30px",
  };
  const thinTypedStyle = {
    fontWeight: "Thin",
    fontSize: "30px",
  };
  return (
    <Box paddingTop={"200px"} paddingBottom={"500px"}>
      <Center>
        <VStack spacing={0.25}>
          <Typed
            style={boldTypedStyle}
            strings={["Hello, my name is Julian!"]}
            typeSpeed={100}
            backDelay={100}
          />
          <Typed
            style={thinTypedStyle}
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
