import {
  Box,
  Flex,
  Heading,
  VStack,
  defineStyleConfig,
} from "@chakra-ui/react";

import { FC } from "react";

const headingTextStyle = defineStyleConfig({
  defaultProps: {
    size: "4xl",
  },
});

const Header: FC = () => {
  return (
    <Flex paddingTop={"3"}>
      <VStack spacing={"1"}>
        <Box>
          <Heading size="lg" fontWeight={"Bold"}>
            Welcome!
          </Heading>
        </Box>
        <Heading size="lg" fontWeight={"Thin"}>
          Hi, my name is Julian Patterson
        </Heading>
      </VStack>
    </Flex>
  );
};

export default Header;
