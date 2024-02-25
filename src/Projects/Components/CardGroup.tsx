import "animate.css";

import { Text, VStack } from "@chakra-ui/react";

import { FC } from "react";
import { FaGithub } from "react-icons/fa";
import ButtonCard from "../../Components/ButtonCard";
import CardBody from "../../Components/CardBody";

const boldTypedStyle = {
  fontWeight: "Bold",
  fontSize: "30px",
};

const CardGroup: FC = () => {
  return (
    <VStack spacing={"20px"}>
      <Text style={boldTypedStyle}>Projects</Text>
      <ButtonCard
        link={"https://github.com/patterson-project/icc-services"}
        label="Repository"
        rightIcon={<FaGithub />}
        title="IoT Control Center"
        body={
          <VStack align={"start"}>
            <CardBody subtitle="Description:" divider={true} />
            <Text>
              Uses technologies such as: FastApi, Docker, Kubernetes and a
              network of raspberry Pis to control a system of IoT devices.
              Features included are: a web interface, an API, and MongoDB all
              ran through Kubernetes and Docker. This project was built to
              control my bedroom lights and worked with the Custom LED
              Controller project. In the final release, a model version was
              created, however, the project has been deprecated. The project was
              deprecated as HomeAssistant was a better solution for my needs.
            </Text>
          </VStack>
        }
      />
      <ButtonCard
        link={"https://github.com/patterson-project/custom-led-controller"}
        label="Repository"
        rightIcon={<FaGithub />}
        title="Custom LED Controller"
        body={
          <VStack align={"start"}>
            <CardBody subtitle="Description:" divider={true} />
            <Text>
              An LED Controller used to control a WS281x LED Strip. Uses FastApi
              and Docker to deploy a service which accepts JSON lighting
              requests. The service then recieves requests from API calls and
              uses a Raspberry Pi to control the LED strip. Responsible for
              mainetance and migration from Flask to FastApi. This project was
              built for a custom LED strip in my bedroom. The final version was
              made to work with HomeAssistant.
            </Text>
          </VStack>
        }
      />
      <ButtonCard
        link={"https://github.com/julian-patterson/julian-patterson.github.io"}
        label="Repository"
        rightIcon={<FaGithub />}
        title="julian-patterson.github.io"
        body={
          <VStack align={"start"}>
            <CardBody subtitle="Description:" divider={true} />
            <Text>
              This website was created using React and Chakra-UI. The website is
              deployed using Github Actions and Github Pages. The website is a
              personal portfolio of some notable projects, education and
              experience. Github Pages is responsible for hosting the website.
              Since the Github Pages can only host static HTML websites, a
              Github Action was created to build the website and push the build
              to the deployment branch. In essense the website can be updated by
              editing the react code on the main branch and then once the
              changes are pushed to the main branch, the website will be
              updated. This allows for continuous integration and deployment.
            </Text>
          </VStack>
        }
      />
    </VStack>
  );
};

export default CardGroup;
