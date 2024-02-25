import { FC } from "react";
import CardBody from "../../Components/CardBody";
import InformationCard from "../../Components/InformationCard";

const Introduction: FC = () => {
  return (
    <InformationCard
      title="About Me"
      body={<CardBody subtitle="" body="Hello, my name is Julian Patterson!" />}
    />
  );
};

export default Introduction;
