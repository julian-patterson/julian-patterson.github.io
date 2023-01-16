import { Card, CardBody, CardHeader, Heading, Text } from "@chakra-ui/react";

import { AnimationOnScroll } from "react-animation-on-scroll";
import { FC } from "react";

const Introduction: FC = () => {
  return (
    <AnimationOnScroll
      animateIn="animate__animated animate__slideInUp"
      offset={50}
      animateOnce={true}
    >
      <Card size="sm">
        <CardHeader>
          <Heading size="md">Introduction</Heading>
        </CardHeader>
        <CardBody>
          <Heading size="sm">Welcome</Heading>
          <Text>
            Hello! My name is Julian Patterson and welcome to my website. I am
            currently a student at Marianopolis College in Pure and Applied
            Sciences. My interests span from coding, CADing, skiing, and
            exploring the world around us.
          </Text>
        </CardBody>
      </Card>
    </AnimationOnScroll>
  );
};

export default Introduction;
