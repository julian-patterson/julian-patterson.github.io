import "./Animations.css";

import { Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";

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
    <div className="hidden">
      <Card>
        <CardHeader>
          <Heading size="md">{props.title}</Heading>
        </CardHeader>
        <CardBody>{props.body}</CardBody>
        {props.footer}
      </Card>
    </div>
  );
};

export default AnimatedCard;
