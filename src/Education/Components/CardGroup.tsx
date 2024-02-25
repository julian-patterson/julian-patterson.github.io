import "animate.css";

import { Text, VStack } from "@chakra-ui/react";

import AnimatedCard from "../../Components/AnimatedCard";
import CardBody from "../../Components/CardBody";
import { FC } from "react";

const CardGroup: FC = () => {
  return (
    <VStack spacing={"20px"}>
      <AnimatedCard
        title="McGill University"
        body={
          <VStack align={"start"}>
            <CardBody subtitle="Software Engineering BSc." />
            <CardBody subtitle="Coursework:" />
          </VStack>
        }
      />
      <AnimatedCard title="Marianopolis College" body={<Text></Text>} />
      <AnimatedCard title="Loyola High School" body={<Text></Text>} />
    </VStack>
  );
};

export default CardGroup;
