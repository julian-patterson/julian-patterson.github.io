import { VStack } from "@chakra-ui/react";
import { FC } from "react";
import { MdOutlineWork } from "react-icons/md";
import CardBody from "../../Components/CardBody";
import InformationCard from "../../Components/InformationCard";

const Experience: FC = () => {
  return (
    <InformationCard
      title="Experience"
      cardIcon={<MdOutlineWork size="25px" color="#d4faec" />}
      body={
        <VStack align="start">
          <CardBody
            subtitle="Junior Developer at Prime Freight Logistics"
            body="Developed React-based tools to automate booking processes, utilizing React, JavaScript, and GitHub Actions for production-ready code. 
            Collaborated with teams and clients to gather requirements, conduct testing, and reduce errors."
            divider={true}
          />
          <CardBody
            subtitle="Design Team Mentor at 296 Northern Knights"
            body="Member and Mentor of the 296 Northern Knights Robotics team
            competing in First Robotics Competition. Directed the design of the
            robot using Autodesk Inventor to create and design over 200 parts.
            Responsible for leading the design team consisting of students.
            Taught lessons on how to use Autodesk Inventor, how to design parts
            for the robot. Held team meetings for high-level design."
          />
        </VStack>
      }
    />
  );
};

export default Experience;
