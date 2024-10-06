import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import { FC } from "react";
import { MdSchool } from "react-icons/md";
import ButtonCard from "../../Components/ButtonCard";
import CardBody from "../../Components/CardBody";

const Education: FC = () => {
  return (
    <ButtonCard
      title="Education"
      link="/education"
      label="Activities and Coursework"
      rightIcon={<ArrowForwardIcon />}
      cardIcon={<MdSchool size="25px" color="#d4faec" />}
      body={
        <Box>
          <CardBody
            subtitle="McGill University"
            body="Software Engineering BSc"
            divider={true}
          />
          <CardBody
            subtitle="Marianopolis College"
            body="Pure & Applied Sciences DEC"
            subsection={true}
            divider={true}
          />
          <CardBody
            subtitle="Loyola High School"
            body="MEES Diploma"
            subsection={true}
          />
        </Box>
      }
    />
  );
};

export default Education;
