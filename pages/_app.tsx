import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import { ColorModeScript } from "@chakra-ui/react";
import theme from "../lib/Theme";
import {useRouter} from "next/router";
import { ColorModeProvider } from "@chakra-ui/color-mode";
import "@fontsource/rubik/700.css";
import "@fontsource/rubik/600.css";
import "@fontsource/rubik/500.css";
import "@fontsource/rubik/400.css";
import "@fontsource/roboto/500.css";
import { UserContext } from "../lib/UserContext"
import {useEffect, useState}  from 'react';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from "../services/firebase"

function MyApp({ Component, pageProps }: AppProps) {
  const [user] = useAuthState(auth);
  const [userBackend, setUserBackend] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (user != null) {
      console.log("Deslogado")
      {/* Fetch user information on backend and set to userBackend and return */}
      if (userBackend === null) {
        //router.push('/user/settings')
      } else {
        //router.push('/')
      }
    }
    //router.push('/login')
    setUserBackend(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);


  // @ts-ignore
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript
        initialColorMode={theme.config.initialColorMode}
      />
      <UserContext.Provider value={{ user, userBackend}}>
         <Component {...pageProps} />
      </UserContext.Provider>
    </ChakraProvider>
  );
}

export default MyApp;
