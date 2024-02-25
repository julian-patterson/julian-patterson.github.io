import { Box, Center, VStack } from "@chakra-ui/react";

import { FC } from "react";
import styled from "styled-components";
import CardGroup from "./Components/CardGroup";

const StyledBox = styled(Box)`
  min-height: 100vh;
  padding-top: 200px;
  padding-bottom: 50px;
`;

const EducationBody: FC = () => {
  return (
    <StyledBox>
      <Center>
        <VStack>
          <CardGroup />
        </VStack>
      </Center>
    </StyledBox>
  );
};

export default EducationBody;
