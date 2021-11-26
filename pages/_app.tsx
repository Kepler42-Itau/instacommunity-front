import type { AppProps } from 'next/app'
import { ChakraProvider } from "@chakra-ui/react"
import NavBar from '../components/NavBar'
import { ColorModeScript } from "@chakra-ui/react"
import theme from "../lib/Theme";
import { ColorModeProvider } from "@chakra-ui/color-mode"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} nonce={theme.config.initialColorMode}/>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp
