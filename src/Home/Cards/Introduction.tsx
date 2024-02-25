import AnimatedCard from "../../Components/AnimatedCard";
import CardBody from "../../Components/CardBody";
import { FC } from "react";

const Introduction: FC = () => {
  return (
    <AnimatedCard
      animationOffset={100}
      title="About Me"
      body={<CardBody subtitle="" body="Hello, My name is Julian Patterson!" />}
    />
  );
};

export default Introduction;
