import { Box } from "@chakra-ui/react";
import { FC } from "react";
import ButtonCard from "./Components/ButtonCard";
import CardBody from "./Components/CardBody";

const Education: FC = () => {
  return (
    <ButtonCard
      title="Education"
      animationOffset={50}
      body={
        <Box>
          <CardBody
            subtitle="McGill University"
            body="Software Engineering (BSc)"
            divider={true}
          />
          <CardBody
            subtitle="Marianopolis College"
            body="Two-year program leading to a Pure & Applied Sciences DEC"
            subsection={true}
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
