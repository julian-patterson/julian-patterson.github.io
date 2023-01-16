import "animate.css";

import { Card, CardBody, CardHeader, Heading, Text } from "@chakra-ui/react";

import { AnimationOnScroll } from "react-animation-on-scroll";
import { FC } from "react";

const CardGroup: FC = () => {
  return (
    <AnimationOnScroll
      animateIn="animate__animated animate__slideInUp"
      animatePreScroll={true}
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
  );
};

export default CardGroup;
