import { Box, Center, VStack } from "@chakra-ui/react";

import CardGroup from "./Components/CardGroup";
import { FC } from "react";
import styled from "styled-components";

const StyledBox = styled(Box)`
  min-height: 100vh;
  padding-top: 200px;
  padding-bottom: 50px;
`;

const boldTypedStyle = {
  fontWeight: "Bold",
  fontSize: "30px",
};

const thinTypedStyle = {
  fontWeight: "Thin",
  fontSize: "30px",
};

const EducationBody: FC = () => {
  return (
    <StyledBox>
      <Center>
        <VStack spacing={"100px"}>
          <CardGroup />
        </VStack>
      </Center>
    </StyledBox>
  );
};

export default EducationBody;
