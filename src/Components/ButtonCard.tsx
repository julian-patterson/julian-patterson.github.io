import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  HStack,
} from "@chakra-ui/react";

import { FC } from "react";
import { Link } from "react-router-dom";

interface IButtonCard {
  title: string;
  body: any;
  label?: any;
  link?: any;
  rightIcon?: any;
}

const ButtonCard: FC<IButtonCard> = (props) => {
  return (
    <Card size="sm">
      <CardHeader>
        <Heading size="md">{props.title}</Heading>
      </CardHeader>
      <CardBody>{props.body}</CardBody>

      <CardFooter paddingTop={"0px"}>
        <HStack justify={"right"} width="100%">
          <Button
            as={Link}
            to={props.link}
            variant="ghost"
            colorScheme="BlackAlpha"
            rightIcon={props.rightIcon}
          >
            {props.label}
          </Button>
        </HStack>
      </CardFooter>
    </Card>
  );
};

export default ButtonCard;
