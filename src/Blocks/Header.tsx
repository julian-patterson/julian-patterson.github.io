import {
  Box,
  Button,
  HStack as Flex,
  Heading,
  Spacer,
  VStack,
  useColorMode,
} from "@chakra-ui/react";

import { FC } from "react";

const Header: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box
      paddingTop={"3"}
      display={"grid"}
      justifyItems="left"
      paddingLeft={"3"}
    >
      <Flex flexDirection={"row"} width={"100%"}>
        <VStack spacing={"1"}>
          <Heading size="3xl" fontWeight="Semibold">
            Welcome!
          </Heading>
          <Heading size="lg" fontWeight={"Thin"} justifyContent="center">
            Hi, my name is Julian Patterson
          </Heading>
        </VStack>
        <Spacer />
        <Button variant="solid" colorScheme="teal" onClick={toggleColorMode}>
          Toggle {colorMode === "light" ? "Dark" : "Light"}
        </Button>
      </Flex>
    </Box>
  );
};

export default Header;
