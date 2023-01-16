import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Heading,
  Text,
} from "@chakra-ui/react";

import { AnimationOnScroll } from "react-animation-on-scroll";
import { FC } from "react";
import { FaGithub } from "react-icons/fa";

const Projects: FC = () => {
  return (
    <AnimationOnScroll
      animateIn="animate__animated animate__slideInUp"
      offset={50}
      animateOnce={true}
    >
      <Card size="sm">
        <CardHeader>
          <Heading size="md">Projects</Heading>
        </CardHeader>
        <CardBody>
          <Heading size="sm">Iot Control Center</Heading>
          <Text>
            React.ts webpage designed using MUI core to control an Iot home
            system. Uses technologies such as: FastApi, docker, Kubernetes and a
            network of raspberry Pis
          </Text>
          <Divider />
          <Heading size="sm" paddingTop={"10px"}>
            Custom LED Controller
          </Heading>
          <Text>
            An LED Controller used to control a WS281x LED Strip. Uses FastApi
            and Docker to deploy a service which accepts JSON lighting requests
          </Text>
          <Divider />
          <Heading size="sm" paddingTop={"10px"}>
            julian-patterson.github.io
          </Heading>
          <Text>
            This website written in React.ts and designed using Chakra Ui. Uses
            Github Workflows to deploy static HTML and Javascript to a Github
            Pages server.
          </Text>
        </CardBody>
        <CardFooter>
          <Button
            colorScheme="gray"
            aria-label="Github"
            size="sm"
            leftIcon={<FaGithub />}
            onClick={() =>
              window.open("https://github.com/julian-patterson", "_blank")
            }
          >
            Learn More
          </Button>
        </CardFooter>
      </Card>
    </AnimationOnScroll>
  );
};

export default Projects;
