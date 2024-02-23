import { Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";

import { FC } from "react";

interface IAnimatedCard {
  title: string;
  body: any;
  animationOffset?: any;
  footer?: any;
}

const AnimatedCard: FC<IAnimatedCard> = (props) => {
  return (
    // <AnimationOnScroll
    //   animateIn="animate__animated animate__slideInUp"
    //   offset={props.animationOffset}
    //   animateOnce={true}
    // >
    <Card size="sm">
      <CardHeader>
        <Heading size="md">{props.title}</Heading>
      </CardHeader>
      <CardBody>{props.body}</CardBody>
      {props.footer}
    </Card>
    // </AnimationOnScroll>
  );
};

export default AnimatedCard;
