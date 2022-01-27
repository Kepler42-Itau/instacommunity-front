import { Box, chakra, Button, useStyleConfig } from "@chakra-ui/react";

export const GoogleButton = chakra(Button, {
  baseStyle: {
    fontWeight: "medium",
    fontFamily: "google",
  },
});
