import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Spacer,
  useColorMode,
} from "@chakra-ui/react";
import { FaEnvelope, FaGithub, FaLinkedinIn, FaPhone } from "react-icons/fa";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

import { FC } from "react";
import styled from "styled-components";

const StyledFlex = styled(Flex)`
  flex-direction: row;
  width: 100%;
`;

const StyledHeading = styled(Heading)`
  font-size: 30px;
  font-weight: 900;
  letter-spacing: 0.2em;
`;

// Header of the website, includes the toggle for dark mode
const Header: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box padding={"3"}>
      <StyledFlex>
        <StyledHeading>JP</StyledHeading>
        <Spacer />
        <IconButton
          colorScheme="gray"
          aria-label="Github"
          size="sm"
          icon={<FaGithub />}
          onClick={() =>
            window.open("https://github.com/julian-patterson", "_blank")
          }
        />
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
        />
        <IconButton
          colorScheme="gray"
          aria-label="Email"
          size="sm"
          icon={<FaEnvelope />}
          onClick={() =>
            (window.location.href = "mailto:julian.e.patterson@icloud.com")
          }
        />
        <IconButton
          colorScheme="gray"
          aria-label="Phone"
          size="sm"
          icon={<FaPhone />}
          onClick={() => (window.location.href = "tel:514-929-1119")}
        />
        <Button
          variant="solid"
          colorScheme="gray"
          onClick={toggleColorMode}
          size="sm"
        >
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
      </StyledFlex>
    </Box>
  );
};

export default Header;
