import { FC } from "react";
import AnimatedCard from "./Components/AnimatedCard";
import CardBody from "./Components/CardBody";

const Introduction: FC = () => {
  return (
    <AnimatedCard
      animationOffset={100}
      title="Introduction"
      body={
        <CardBody
          subtitle="About Me"
          body="Hello! My name is Julian Patterson! I am currently a student at McGill University studying software engineerings. In my freetime, I enjoy exploring the outdoors by skiing and hiking as well as learning about new technologies. "
        />
      }
    />
  );
};

export default Introduction;
