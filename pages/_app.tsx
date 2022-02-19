import "../styles/globals.css";
import type { AppProps } from "next/app";
import theme from '../components/theme';
import Fonts from '../components/fonts';
import { ChakraProvider } from "@chakra-ui/react";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Fonts/>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
