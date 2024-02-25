import { Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";

import { FC } from "react";

interface IInformationCard {
  title: string;
  body: any;
  footer?: any;
}

const InformationCard: FC<IInformationCard> = (props) => {
  return (
    <Card size="sm">
      <CardHeader>
        <Heading size="md">{props.title}</Heading>
      </CardHeader>
      <CardBody>{props.body}</CardBody>
      {props.footer}
    </Card>
  );
};

export default InformationCard;
