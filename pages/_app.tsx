import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../lib/Theme";
import Layout from "../components/Layout";
import "@fontsource/rubik/700.css";
import "@fontsource/rubik/600.css";
import "@fontsource/rubik/500.css";
import "@fontsource/rubik/400.css";
import "@fontsource/roboto/500.css";

const Website = ({ Component, pageProps, router }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Layout router={router}>
        <Component {...pageProps} key={router.route} />
      </Layout>
    </ChakraProvider>
  );
};

export default Website;
