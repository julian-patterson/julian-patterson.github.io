import { Button, CardFooter as ChackraUiCardFooter } from "@chakra-ui/react";

import { FC } from "react";

interface ICardFooter {
  ariaLabel: string;
  buttonTitle?: string;
  leftIcon?: any;
  onClick(): void;
}

const CardFooter: FC<ICardFooter> = (props) => {
  return (
    <ChackraUiCardFooter>
      <Button
        colorScheme="gray"
        aria-label={props.ariaLabel}
        size="sm"
        leftIcon={props.leftIcon}
        onClick={() => props.onClick}
      >
        {props.buttonTitle}
      </Button>
    </ChackraUiCardFooter>
  );
};

export default CardFooter;
