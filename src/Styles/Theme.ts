import { StyleFunctionProps, mode } from "@chakra-ui/theme-tools";
import {
  ThemeConfig,
  createMultiStyleConfigHelpers,
  defineStyle,
  defineStyleConfig,
  extendTheme
} from "@chakra-ui/react";

import { cardAnatomy } from "@chakra-ui/anatomy";

// Theming for all components on the website

//Config and Global theming
// const config: ThemeConfig = {
//   initialColorMode: "system",
//   useSystemColorMode: false,
// };

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
}

const globalStyles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      color: mode("#121212", "#d4faec")(props),
      bg: mode("#d4faec", "#121212")(props),
    },
  }),
};

//Component theming
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys);

const cardBaseStyle = definePartsStyle((props) => {
  return {
    container: {
      backgroundColor: mode("#f5f2f2", "#282828")(props),
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
    borderColor: mode("#d6c9c9", "#121212")(props),
    borderWidth: "3px",
    borderRadius: 2,
  };
});

const dividerTheme = defineStyleConfig({ baseStyle: dividerBaseStyle });

const components = {
  Card: cardTheme,
  Divider: dividerTheme,
};

const breakpoints = {
  base: '0px', 
  sm: '480px', 
  md: '768px', 
  lg: '992px', 
  xl: '1280px', 
}

const theme = extendTheme({
  config,
  styles: globalStyles,
  components,
  breakpoints
});


export default theme;
