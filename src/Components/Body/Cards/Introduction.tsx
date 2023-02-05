import AnimatedCard from "./Components/AnimatedCard";
import CardBody from "./Components/CardBody";
import { FC } from "react";

// Introduction Card
const Introduction: FC = () => {
  return (
    <AnimatedCard
      animationOffset={100}
      title="Introduction"
      body={
        <CardBody
          subtitle="About Me"
          body="Hello! My name is Julian Patterson and welcome to my website. I am currently a student at Marianopolis College in Pure and Applied Sciences. My interests span from coding, CADing, skiing, and exploring the world around us."
        />
      }
    />
  );
};

export default Introduction;
