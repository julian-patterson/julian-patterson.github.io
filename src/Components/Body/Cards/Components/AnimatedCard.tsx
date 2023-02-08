import { Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";

import { AnimationOnScroll } from "react-animation-on-scroll";
import { FC } from "react";

interface IAnimatedCard {
  title: string;
  body: any;
  animationOffset: any;
  footer?: any;
}

const AnimatedCard: FC<IAnimatedCard> = (props) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      console.log(entry);
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  });

  const hiddenElements = document.querySelectorAll(".hidden");
  hiddenElements.forEach((el) => observer.observe(el));

  return (
    <AnimationOnScroll
      animateIn="animate__animated animate__slideInUp"
      offset={props.animationOffset}
      animateOnce={true}
    >
      <link rel="stylesheet" href="CardStyles.css" />
      <Card size="sm" className="hidden">
        <CardHeader>
          <Heading size="md">{props.title}</Heading>
        </CardHeader>
        <CardBody>{props.body}</CardBody>
        {props.footer}
      </Card>
    </AnimationOnScroll>
  );
};

export default AnimatedCard;
