import { ColorModeScript } from "@chakra-ui/react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import theme from "../components/theme";

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="zh-CN">
        <Head>
          <meta name="referrer" content="no-referrer" />
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
