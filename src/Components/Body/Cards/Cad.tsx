import AnimatedCard from "./Components/AnimatedCard";
import CardBody from "./Components/CardBody";
import { FC } from "react";

// Cad card
const Cad: FC = () => {
  return (
    <AnimatedCard
      title="CAD Projects"
      animationOffset={50}
      body={
        <CardBody
          subtitle="296 Northern Knights"
          body="Member and Mentor of the 296 Northern Knights Robotics team competing in First Robotics Competition. Assigned team lead of the CAD - computer aided design - team for two years. Directed the design of the robot using Autodesk Inventor to create and design over 200 parts."
        />
      }
    />
  );
};

export default Cad;
