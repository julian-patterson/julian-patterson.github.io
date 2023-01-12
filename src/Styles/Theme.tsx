import { StyleFunctionProps, mode } from "@chakra-ui/theme-tools";
import { ThemeConfig, extendTheme } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: false,
};

const styles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      color: mode("#291F1F", "#EBE6E6")(props),
      bg: mode("#EBE6E6", "#291F1F")(props),
    },
  }),
};

const components = {
  Drawer: {
    // setup light/dark mode component defaults
    baseStyle: (props: StyleFunctionProps) => ({
      dialog: {
        bg: mode("white", "#141214")(props),
      },
    }),
  },
};

const theme = extendTheme({
  config,
  components,
  styles,
});

export default theme;
