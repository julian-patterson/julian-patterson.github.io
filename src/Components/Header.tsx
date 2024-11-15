import { Box, Heading, HStack, IconButton, Spacer } from "@chakra-ui/react";
import { FaEnvelope, FaGithub, FaLinkedinIn, FaPhone } from "react-icons/fa";

import { FC } from "react";
import { Link } from "react-router-dom";

const Header: FC = () => {
  // const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box padding={"3"}>
      <HStack flexDirection={"row"} width={"100%"}>
        <Link to="/">
          <Heading
            fontSize={"40px"}
            fontWeight="black"
            letterSpacing="widest"
            color={"#d4faec"}
          >
            JP
          </Heading>
        </Link>
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
        {/* <Button
          variant="solid"
          colorScheme="gray"
          onClick={toggleColorMode}
          size="sm"
        >
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button> */}
      </HStack>
    </Box>
  );
};

export default Header;
