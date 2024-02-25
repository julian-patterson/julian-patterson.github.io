import "animate.css";

import { Text, VStack } from "@chakra-ui/react";

import { FC } from "react";
import AnimatedCard from "../../Components/AnimatedCard";
import CardBody from "../../Components/CardBody";

const boldTypedStyle = {
  fontWeight: "Bold",
  fontSize: "30px",
};

const CardGroup: FC = () => {
  return (
    <VStack spacing={"20px"}>
      <Text style={boldTypedStyle}>Education</Text>
      <AnimatedCard
        title="McGill University"
        body={
          <VStack align={"start"}>
            <CardBody subtitle="Software Engineering BSc." divider={true} />
            <CardBody subtitle="Coursework:" />
            <Text>
              Data Structures and Algorithms, Discrete Mathematics, Linear
              Algebra, Calculus, Programming Languages and Paradigms,
              Introduction to Computer Systems, Introduction to Software Systems{" "}
            </Text>
          </VStack>
        }
      />
      <AnimatedCard
        title="Marianopolis College"
        body={
          <VStack align={"start"}>
            <CardBody
              subtitle="Pure and Applied Sciences DEC."
              divider={true}
            />
            <CardBody subtitle="Coursework:" />
            <Text>
              Physics, Chemistry, Biology, Calculus, Linear Algebra, Mechanics,
              Electricity and Magnetism, Physical Chemistry, Computer Science
            </Text>
            <CardBody subtitle="Activities:" />
            <Text>Peer Tutor for Chemistry of Solutions</Text>
          </VStack>
        }
      />
      <AnimatedCard
        title="Loyola High School"
        body={
          <VStack align={"start"}>
            <CardBody subtitle="MEES High School " divider={true} />
            <CardBody subtitle="Activities:" />
            <Text>First Robotics Competition Team Mentor</Text>
          </VStack>
        }
      />
    </VStack>
  );
};

export default CardGroup;
