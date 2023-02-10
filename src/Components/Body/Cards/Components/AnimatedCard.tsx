import { Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";

import { FC } from "react";
import styled from "styled-components";

interface IAnimatedCard {
  title: string;
  body: any;
  animationOffset: any;
  footer?: any;
  visibility: boolean;
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
  if (props.visibility == true) {
    const TestCard = styled(Card)`
      opacity: 1;
      transform: translateY(0);
    `;
  }

  if (props.visibility == false) {
    const TestCard = styled(Card)`
      opacity: 0;
      filter: blur(5px);
      transform: translateY(-100%);
      transition: all 1s;
    `;
  }

  return (
    <Card>
      <CardHeader>
        <Heading size="md">{props.title}</Heading>
      </CardHeader>
      <CardBody>{props.body}</CardBody>
      {props.footer}
    </Card>
  );
};

export default AnimatedCard;
