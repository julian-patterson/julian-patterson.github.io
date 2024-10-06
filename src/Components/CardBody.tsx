import { Box, Divider, Heading, Text } from "@chakra-ui/react";

import { FC } from "react";

interface ICardBody {
  subtitle: string;
  body?: string;
  subsection?: boolean;
  divider?: boolean;
}

const CardBody: FC<ICardBody> = (props) => {
  return (
    <Box>
      <Heading
        size="sm"
        paddingTop={props.subsection === true ? "10px" : "0px"}
        width="350px"
      >
        {props.subtitle}
      </Heading>
      <Text>{props.body}</Text>
      {props.divider === true ? <Divider paddingTop={"10px"} /> : <div />}
    </Box>
  );
};

export default CardBody;
