import { FC } from "react";
import ButtonCard from "./Components/ButtonCard";
import CardBody from "./Components/CardBody";

const ExpButtonGroup: FC = () => {
  return (
    <ButtonCard
      animationOffset={100}
      title="About Me"
      body={<CardBody subtitle="" body="Hello, My name is Julian Patterson!" />}
    />
  );
};

export default ExpButtonGroup;
