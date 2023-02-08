import { Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";

import { FC } from "react";
import styled from "styled-components";

interface IAnimatedCard {
  title: string;
  body: any;
  animationOffset: any;
  footer?: any;
}

const HiddenCard = styled(Card)`
  opacity: 0;
  filter: blur(5px);
  transform: translateY(-100%);
  transition: all 1s;
`;

const ShownCard = styled(Card)`
  opacity: 1;
  transform: translateY(0);
`;

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
    <div className="section">
      <Card size="sm">
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
