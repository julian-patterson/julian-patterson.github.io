import { Box, Button, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { FaEnvelope, FaGithub, FaLinkedin, FaPhone } from "react-icons/fa";

import CardGroup from "./Components/CardGroup";
import { FC } from "react";
import styled from "styled-components";

const boldTypedStyle = {
  fontWeight: "Bold",
  fontSize: "40px",
  color: "#e6e6e6",
};

const titleStyle = {
  fontWeight: "Bold",
  fontSize: "25px",
  color: "#e6e6e6",
};

const thinTypedStyle = {
  fontWeight: "normmal",
  fontSize: "25px",
};

const StyledBox = styled(Box)`
  min-height: 100vh;
  padding-top: 200px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HomeBody: FC = () => {
  return (
    <StyledBox>
      <Flex
        direction={{
          base: "column",
          sm: "column",
          md: "column",
          lg: "row",
          xl: "row",
        }}
        justify="space-between"
        align={{
          base: "center",
          sm: "center",
          md: "center",
          lg: "start",
          xl: "start",
        }}
        justifyContent="start"
      >
        <VStack
          spacing={0.25}
          align="flex-end"
          paddingRight={{
            base: "10px",
            sm: "10px",
            md: "10px",
            lg: "20px",
            xl: "20px",
          }}
        >
          <Text style={boldTypedStyle}>Julian Patterson</Text>
          <Text style={thinTypedStyle}>Software Engineering Student</Text>
          <Text style={thinTypedStyle}>@ McGill University</Text>
          <VStack align="end" paddingTop="20px">
            <Text style={titleStyle}>About Me</Text>
            <Text
              align="end"
              width={{
                base: "300px",
                sm: "300px",
                md: "300px",
                lg: "400px",
                xl: "400px",
              }}
              color="#e6e6e6"
              fontSize="18"
            >
              U2 Software Engineering student with a minor in Entrepreneurship.
              I'm passionate about exploring new technologies, software design,
              and engineering. My goal is create software projects that are both
              impactful and useful.
            </Text>
          </VStack>
          <HStack paddingTop="20px">
            <Button
              as="a"
              href="mailto:julian.e.patterson@icloud.com"
              target="_blank"
              rel="nopener noreferrer"
              bg="#282828"
              color="#d4faec"
              border="1px"
              borderColor="#282828"
              _hover={{ bg: "#121212", color: "#d4faec" }}
              leftIcon={<FaEnvelope />}
            >
              Email
            </Button>
            <Button
              as="a"
              href="tel:514-929-1119"
              target="_blank"
              rel="nopener noreferrer"
              bg="#282828"
              border="1px"
              color="#d4faec"
              borderColor="#282828"
              _hover={{ bg: "#121212", color: "#d4faec" }}
              leftIcon={<FaPhone />}
            >
              Call
            </Button>
          </HStack>
          <HStack paddingTop="10px">
            <Button
              as="a"
              href="https://github.com/julian-patterson"
              target="_blank"
              rel="nopener noreferrer"
              bg="#282828"
              border="1px"
              color="#d4faec"
              borderColor="#282828"
              _hover={{ bg: "#121212", color: "#d4faec" }}
              leftIcon={<FaGithub />}
            >
              Github
            </Button>
            <Button
              as="a"
              href="https://ca.linkedin.com/in/julian-e-patterson"
              target="_blank"
              width="180px"
              rel="nopener noreferrer"
              bg="#282828"
              border="1px"
              color="#d4faec"
              borderColor="#282828"
              _hover={{ bg: "#121212", color: "#d4faec" }}
              leftIcon={<FaLinkedin />}
            >
              LinkedIn
            </Button>
          </HStack>
        </VStack>
        <VStack
          spacing={"100px"}
          paddingLeft={{
            md: "0px",
            lg: "50px",
          }}
          paddingTop={{
            base: "50px",
            sm: "50px",
            md: "50px",
            lg: "0px",
          }}
          paddingRight="50"
          align={{
            base: "center",
            sm: "center",
            md: "center",
            lg: "flex-start",
          }}
          justify={{
            base: "center",
            sm: "center",
            md: "center",
            lg: "start",
          }}
        >
          <CardGroup />
        </VStack>
      </Flex>
    </StyledBox>
  );
};

export default HomeBody;
