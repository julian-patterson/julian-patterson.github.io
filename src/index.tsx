import "./Styles/index.css";

import { ColorModeScript } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./Root";
import theme from "./Styles/Theme";

// React router and the theme configuration
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <Root />
  </React.StrictMode>
);
