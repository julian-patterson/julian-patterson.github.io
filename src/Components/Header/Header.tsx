import {
  Box,
  Button,
  HStack as Flex,
  Heading,
  IconButton,
  Spacer,
  useColorMode,
} from "@chakra-ui/react";
import { FaEnvelope, FaGithub, FaLinkedinIn, FaPhone } from "react-icons/fa";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

import { FC } from "react";

const Header: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box padding={"3"}>
      <Flex flexDirection={"row"} width={"100%"}>
        <Heading fontSize="40px" fontWeight="black" letterSpacing="widest">
          JP
        </Heading>
        <Spacer />
        <IconButton
          colorScheme="gray"
          aria-label="Github"
          size="sm"
          icon={<FaGithub />}
          onClick={() =>
            window.open("https://github.com/julian-patterson", "_blank")
          }
        ></IconButton>
        <IconButton
          colorScheme="gray"
          aria-label="Linked-In"
          size="sm"
          icon={<FaLinkedinIn />}
          onClick={() =>
            window.open(
              "https://ca.linkedin.com/in/julian-e-patterson",
              "_blank"
            )
          }
        ></IconButton>
        <IconButton
          colorScheme="gray"
          aria-label="Email"
          size="sm"
          icon={<FaEnvelope />}
          onClick={() =>
            (window.location.href = "mailto:julian.e.patterson@icloud.com")
          }
        ></IconButton>
        <IconButton
          colorScheme="gray"
          aria-label="Phone"
          size="sm"
          icon={<FaPhone />}
          onClick={() => (window.location.href = "tel:514-929-1119")}
        ></IconButton>
        <Button
          variant="solid"
          colorScheme="gray"
          onClick={toggleColorMode}
          size="sm"
        >
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Flex>
    </Box>
  );
};

export default Header;
