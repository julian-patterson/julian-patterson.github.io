import "animate.css";

import { Text, VStack } from "@chakra-ui/react";

import CardBody from "../../Components/CardBody";
import { FC } from "react";
import InformationCard from "../../Components/InformationCard";

const boldTypedStyle = {
  fontWeight: "Bold",
  fontSize: "30px",
};

const CardGroup: FC = () => {
  return (
    <VStack spacing={"20px"}>
      <Text style={boldTypedStyle}>Education</Text>
      <InformationCard
        title="McGill University"
        body={
          <VStack align={"start"}>
            <CardBody subtitle="Software Engineering BSc." divider={true} />
            <CardBody subtitle="Coursework:" />
            <Text>
              Data Structures and Algorithms, Discrete Mathematics, Linear
              Algebra, Calculus, Programming Languages and Paradigms,
              Introduction to Computer Systems, Introduction to Software
              Systems, Software Design, Operating Systems, and Software
              Engineering Project.{" "}
            </Text>
          </VStack>
        }
      />
      <InformationCard
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
      <InformationCard
        title="Loyola High School"
        body={
          <VStack align={"start"}>
            <CardBody subtitle="MEES High School Diploma" divider={true} />
            <CardBody subtitle="Activities:" />
            <Text>
              Member and Mentor of the 296 Northern Knights Robotics team
              competing in First Robotics Competition. Assigned team lead of the
              CAD - computer aided design - team for two years. Directed the
              design of the robot using Autodesk Inventor to create and design
              over 200 parts.
            </Text>
          </VStack>
        }
      />
    </VStack>
  );
};

export default CardGroup;
