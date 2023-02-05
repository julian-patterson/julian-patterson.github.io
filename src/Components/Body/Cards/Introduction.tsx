import AnimatedCard from "./Components/AnimatedCard";
import { Box } from "@chakra-ui/react";
import CardBody from "./Components/CardBody";
import { FC } from "react";

// Introduction Card
const Introduction: FC = () => {
  return (
    <AnimatedCard
      animationOffset={100}
      title="Introduction"
      body={
        <Box>
          <CardBody subtitle="About Me" body="example" divider={true} />
          <CardBody subtitle="blah" body="ex" subsection={true} />
        </Box>
      }
    />
  );
};

export default Introduction;
