import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  initialColorMode: 'dark',
  useSystemColorMode: false,
  fonts: {
    heading: "Pixel",
    body: "Pixel",
  }
});

export default theme;
