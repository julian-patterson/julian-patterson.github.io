import { Box } from "@chakra-ui/react";
import { FC } from "react";
import CardBody from "../../Components/CardBody";
import InformationCard from "../../Components/InformationCard";

const Introduction: FC = () => {
  return (
    <Box pt="10">
      <InformationCard
        title="About Me"
        body={
          <CardBody
            subtitle=""
            body="Aspiring Software Engineer with a minor in Entrepreneurship. I have experience developing backend & frontend."
          />
        }
      />
    </Box>
  );
};

export default Introduction;
