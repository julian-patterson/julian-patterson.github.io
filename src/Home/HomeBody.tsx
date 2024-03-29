import { Box, Center, VStack } from "@chakra-ui/react";

import { FC } from "react";
import Typed from "react-typed";
import styled from "styled-components";
import CardGroup from "./Components/CardGroup";

const boldTypedStyle = {
  fontWeight: "Bold",
  fontSize: "30px",
};

const thinTypedStyle = {
  fontWeight: "Thin",
  fontSize: "30px",
};

const StyledBox = styled(Box)`
  min-height: 100vh;
  padding-top: 200px;
  padding-bottom: 50px;
`;

const HomeBody: FC = () => {
  return (
    <StyledBox>
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
    </StyledBox>
  );
};

export default HomeBody;
