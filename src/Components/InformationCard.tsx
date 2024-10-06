import { Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";

import { FC } from "react";

interface IInformationCard {
  title: string;
  body: any;
  footer?: any;
  cardIcon?: any;
}

const InformationCard: FC<IInformationCard> = (props) => {
  return (
    <Card size="sm" width="425px">
      <CardHeader>
        {props.cardIcon}
        <Heading paddingTop="10px" size="md">
          {props.title}
        </Heading>
      </CardHeader>
      <CardBody>{props.body}</CardBody>
      {props.footer}
    </Card>
  );
};

export default InformationCard;
