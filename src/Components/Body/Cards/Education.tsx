import { Box } from "@chakra-ui/react";
import { FC } from "react";
import AnimatedCard from "./Components/AnimatedCard";
import CardBody from "./Components/CardBody";

const Education: FC = () => {
  return (
    <AnimatedCard
      title="Education"
      animationOffset={50}
      body={
        <Box>
          <CardBody
            subtitle="Marianopolis College"
            body="Two-year program leading to a DEC discovering topics such as advanced mathematics, biology, chemistry, and physics."
            divider={true}
          />
          <CardBody
            subtitle="Loyola High School"
            body="Secondary School leading to a MEES Diploma"
            subsection={true}
          />
        </Box>
      }
    />
  );
};

export default Education;
