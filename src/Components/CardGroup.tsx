import "animate.css";

import { VStack } from "@chakra-ui/react";

import { FC } from "react";

interface ICardGroup {
  elements: any;
}

const CardGroup: FC<ICardGroup> = (props) => {
  return <VStack spacing={"20px"}>{props.elements}</VStack>;
};

export default CardGroup;
