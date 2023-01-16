import "animate.css";

import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";

import { AnimationOnScroll } from "react-animation-on-scroll";
import { FC } from "react";

const CardGroup: FC = () => {
  return (
    <VStack spacing={"20px"}>
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
              Sciences. My current program teaches me about biology, chemistry,
              physics, and advanced mathematics. My interests span from coding,
              CADing, skiing, and exploring the world around us.
            </Text>
          </CardBody>
        </Card>
      </AnimationOnScroll>
      <AnimationOnScroll
        animateIn="animate__animated animate__slideInUp"
        offset={50}
        animateOnce={true}
      >
        <Card size="sm">
          <CardHeader>
            <Heading size="md">Education</Heading>
          </CardHeader>
          <CardBody>
            <Heading size="sm">Marianopolis College</Heading>
            <Text>Marianopolis College is </Text>
            <Divider />
            <Heading size="sm">Loyola High School</Heading>
            <Text>Marianopolis College is </Text>
          </CardBody>
        </Card>
      </AnimationOnScroll>
      <AnimationOnScroll
        animateIn="animate__animated animate__slideInUp"
        offset={50}
        animateOnce={true}
      >
        <Card size="sm">
          <CardHeader>
            <Heading size="md">Introduction:</Heading>
          </CardHeader>
          <CardBody>
            <Heading size="sm">Subsection</Heading>
            <Text>Example body texy</Text>
          </CardBody>
        </Card>
      </AnimationOnScroll>
    </VStack>
  );
};

export default CardGroup;
