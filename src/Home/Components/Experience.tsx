import { Text, VStack } from "@chakra-ui/react";

import { FC } from "react";
import CardBody from "../../Components/CardBody";
import InformationCard from "../../Components/InformationCard";

const Experience: FC = () => {
  return (
    <InformationCard
      title="Experience"
      body={
        <VStack align={"start"}>
          <CardBody subtitle="296 Northern Knights" divider={true} />
          <Text>
            Member and Mentor of the 296 Northern Knights Robotics team
            competing in First Robotics Competition. Directed the design of the
            robot using Autodesk Inventor to create and design over 200 parts.
            Responsible for leading the design team consisting of students.
            Taught lessons on how to use Autodesk Inventor, how to design parts
            for the robot. Held team meetings for high-level design.
          </Text>
        </VStack>
      }
    />
  );
};

export default Experience;
