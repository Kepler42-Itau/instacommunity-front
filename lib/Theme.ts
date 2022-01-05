import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: "Rubik",
    body: "Rubik",
    google: "Roboto",
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "500",
        letterSpacing: "0.4px",
      },
    },
  },
});

export default theme;
