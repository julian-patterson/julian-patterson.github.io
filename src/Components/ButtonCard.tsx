import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  HStack,
  VStack,
} from "@chakra-ui/react";

import { FC } from "react";
import { Link } from "react-router-dom";

interface IButtonCard {
  title: string;
  body: any;
  label?: any;
  link?: any;
  rightIcon?: any;
  cardIcon?: any;
}

const ButtonCard: FC<IButtonCard> = (props) => {
  return (
    <Card size="sm" width="425px">
      <CardHeader>
        <VStack align="flex-start">
          {props.cardIcon}
          <Heading size="md">{props.title}</Heading>
        </VStack>
      </CardHeader>
      <CardBody>{props.body}</CardBody>

      <CardFooter paddingTop={"0px"}>
        <HStack justify={"right"} width="100%">
          <Button
            as={Link}
            to={props.link}
            bg="#00000"
            border="1px"
            borderColor="#d4faec"
            _hover={{ bg: "#d4faec", color: "#000000" }}
            color="#d4faec"
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