import { StyleFunctionProps, mode } from "@chakra-ui/theme-tools";
import {
  ThemeConfig,
  createMultiStyleConfigHelpers,
  defineStyle,
  defineStyleConfig,
  extendTheme,
} from "@chakra-ui/react";

import { cardAnatomy } from "@chakra-ui/anatomy";

// Theming for all components on the website

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

const cardBaseStyle = definePartsStyle((props) => {
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

const cardTheme = defineMultiStyleConfig({ baseStyle: cardBaseStyle });

const dividerBaseStyle = defineStyle((props) => {
  return {
    borderColor: mode("#d6c9c9", "#261c1c")(props),
    borderWidth: "3px",
    borderRadius: 2,
  };
});

const dividerTheme = defineStyleConfig({ baseStyle: dividerBaseStyle });

const components = {
  Card: cardTheme,
  Divider: dividerTheme,
};

const theme = extendTheme({
  config,
  styles: globalStyles,
  components,
});

export default theme;
