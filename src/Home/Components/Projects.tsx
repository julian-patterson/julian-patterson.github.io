import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import { FC } from "react";
import { MdCode } from "react-icons/md";
import ButtonCard from "../../Components/ButtonCard";
import CardBody from "../../Components/CardBody";

const Projects: FC = () => {
  return (
    <ButtonCard
      title="Projects"
      label={"Projects"}
      link="/projects"
      rightIcon={<ArrowForwardIcon />}
      cardIcon={<MdCode size="30px" color="#d4faec" />}
      body={
        <Box>
          <CardBody
            subtitle="IoT Control Center"
            body="Smart Home Control Center"
            divider={true}
          />
          <CardBody
            subtitle="Custom LED Controller"
            body="LED Controller for custom LED strips"
            divider={true}
            subsection={true}
          />
          <CardBody
            subtitle="julian-patterson.github.io"
            body="This website written in React.ts and designed using Chakra Ui."
            subsection={true}
          />
        </Box>
      }
    />
  );
};

export default Projects;
