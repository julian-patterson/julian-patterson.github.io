import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  HStack,
} from "@chakra-ui/react";

import { ArrowForwardIcon } from "@chakra-ui/icons";
import { FC } from "react";
import { AnimationOnScroll } from "react-animation-on-scroll";

interface IAnimatedCard {
  title: string;
  body: any;
  animationOffset: any;
  footer?: any;
}

const ButtonCard: FC<IAnimatedCard> = (props) => {
  return (
    <AnimationOnScroll
      animateIn="animate__animated animate__slideInUp"
      offset={props.animationOffset}
      animateOnce={true}
    >
      <Card size="sm">
        <CardHeader>
          <Heading size="md">{props.title}</Heading>
        </CardHeader>
        <CardBody>{props.body}</CardBody>
        {props.footer}
        <CardFooter paddingTop={"5px"}>
          <HStack justify={"right"} width="100%">
            <Button
              variant="ghost"
              colorScheme="BlackAlpha"
              rightIcon={<ArrowForwardIcon />}
            >
              Learn More
            </Button>
          </HStack>
        </CardFooter>
      </Card>
    </AnimationOnScroll>
  );
};

export default ButtonCard;
