import { FC } from "react";
import AnimatedCard from "../../Components/AnimatedCard";
import CardBody from "../../Components/CardBody";

const Introduction: FC = () => {
  return (
    <AnimatedCard
      animationOffset={100}
      title="About Me"
      body={<CardBody subtitle="" body="Hello, my name is Julian Patterson!" />}
    />
  );
};

export default Introduction;
