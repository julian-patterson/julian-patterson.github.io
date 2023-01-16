import { StyleFunctionProps, mode } from "@chakra-ui/theme-tools";
import {
  ThemeConfig,
  createMultiStyleConfigHelpers,
  extendTheme,
} from "@chakra-ui/react";

import { cardAnatomy } from "@chakra-ui/anatomy";

//Config and Global theming
const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: false,
};

const globalStyles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      color: mode("#291F1F", "#EBE6E6")(props),
      bg: mode("#EBE6E6", "#291F1F")(props),
    },
  }),
};

//Component theming
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys);

const baseStyle = definePartsStyle((props) => {
  return {
    container: {
      backgroundColor: mode("#f5f2f2", "#3b2d2d")(props),
      width: "320px",
      borderRadius: "15px",
      shadow: "2xl",
    },
    header: {
      paddingBottom: "4px",
    },
    body: {
      paddingTop: "2px",
    },
  };
});

const cardTheme = defineMultiStyleConfig({ baseStyle });

const components = {
  Card: cardTheme,
};

const theme = extendTheme({
  config,
  styles: globalStyles,
  components,
});

export default theme;
