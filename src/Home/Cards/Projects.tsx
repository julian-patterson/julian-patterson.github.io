import AnimatedCard from "../../Components/AnimatedCard";
import { Box } from "@chakra-ui/react";
import CardBody from "../../Components/CardBody";
import { FC } from "react";

const Projects: FC = () => {
  return (
    <AnimatedCard
      title="Projects"
      animationOffset={50}
      body={
        <Box>
          <CardBody
            subtitle="Iot Control Center"
            body="React.ts webpage designed using MUI core to control an Iot home system. Uses technologies such as: FastApi, docker, Kubernetes and a network of raspberry Pis"
            divider={true}
          />
          <CardBody
            subtitle="Custom LED Controller"
            body="An LED Controller used to control a WS281x LED Strip. Uses FastApi and Docker to deploy a service which accepts JSON lighting requests"
            divider={true}
            subsection={true}
          />
          <CardBody
            subtitle="julian-patterson.github.io"
            body="This website written in React.ts and designed using Chakra Ui. Uses Github Workflows to deploy static HTML and Javascript to a Github Pages server."
            subsection={true}
          />
        </Box>
      }
    />
  );
};

export default Projects;
