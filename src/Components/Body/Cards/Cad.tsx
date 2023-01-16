import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Collapse,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import { AnimationOnScroll } from "react-animation-on-scroll";
import { FC } from "react";

const Cad: FC = () => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <AnimationOnScroll
      animateIn="animate__animated animate__slideInUp"
      offset={50}
      animateOnce={true}
    >
      <Card size="sm">
        <CardHeader>
          <Heading size="md">CAD Projects</Heading>
        </CardHeader>
        <CardBody>
          <Heading size="sm">296 Northern Knights</Heading>
          <Text>
            Member of the 296 Northern Knights Robotics team competing in First
            Robotics Competition. Assigned team lead of the CAD - computer aided
            design - team for two years. Directed the design of the robot using
            Autodesk Inventor to create and design over 200 parts.
          </Text>
        </CardBody>
        <CardFooter>
          <Button onClick={onToggle}>See More</Button>
          <Collapse in={isOpen} animateOpacity>
            <Box paddingTop={"40px"} marginLeft={0}>
              <Text>
                Example of a feature I might implement. I know there is a bug.
                Would include some photos from projects
              </Text>
            </Box>
          </Collapse>
        </CardFooter>
      </Card>
    </AnimationOnScroll>
  );
};

export default Cad;
