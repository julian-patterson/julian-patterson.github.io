import { Box, Heading, VStack, defineStyleConfig } from "@chakra-ui/react";

import { FC } from "react";

const headerStyle = defineStyleConfig({
  defaultProps: {},
});

const Header: FC = () => {
  return (
    <Box
      paddingTop={"3"}
      position={"-webkit-sticky"}
      alignItems="center"
      justifyContent={"start"}
      paddingLeft={"3"}
    >
      <VStack spacing={"1"}>
        <Heading size="3xl" fontWeight="Semibold">
          Welcome!
        </Heading>
        <Heading size="lg" fontWeight={"Thin"} justifyContent="center">
          Hi, my name is Julian Patterson
        </Heading>
      </VStack>
    </Box>
  );
};

export default Header;
