import { Box, Grid, GridItem, Heading, Image } from "@chakra-ui/react";

import { FC } from "react";

const Header: FC = () => {
  return (
    <Grid templateColumns="repeat(10, 1fr)">
      <GridItem w="100%" h="20" colSpan={1}>
        <Box
          bgGradient="linear(to-t, #ffffff, #fcd47e)"
          paddingLeft={"5"}
          paddingTop={"5"}
        >
          <Image
            borderRadius="full"
            boxSize="10"
            src="https://avatars.githubusercontent.com/u/77037728?v=4"
          />
        </Box>
      </GridItem>
      <GridItem w="100%" h="20" colSpan={9}>
        <Box
          bgGradient="linear(to-t, #ffffff, #fcd47e)"
          paddingTop={"5"}
          paddingLeft={"2"}
        >
          <Heading textColor={"#000000"}>Welcome to my homepage</Heading>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default Header;
