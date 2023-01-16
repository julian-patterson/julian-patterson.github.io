import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Heading,
  Text,
} from "@chakra-ui/react";

import { AnimationOnScroll } from "react-animation-on-scroll";
import { FC } from "react";

const Education: FC = () => {
  return (
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
          <Text as="i">Pure and Applied Sciences</Text>
          <Text>
            Two-year program leading to a DEC discovering topics such as
            advanced mathematics, biology, chemistry, and physics.
          </Text>
          <Divider />
          <Heading size="sm" paddingTop={"10px"}>
            Loyola High School
          </Heading>
          <Text>Secondary School leading to a MEES Diploma</Text>
        </CardBody>
      </Card>
    </AnimationOnScroll>
  );
};

export default Education;
