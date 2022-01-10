import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import { ColorModeScript } from "@chakra-ui/react";
import theme from "../lib/Theme";
import {useRouter} from "next/router";
import "@fontsource/rubik/700.css";
import "@fontsource/rubik/600.css";
import "@fontsource/rubik/500.css";
import "@fontsource/rubik/400.css";
import "@fontsource/roboto/500.css";
import { UserContext } from "../lib/UserContext"
import { useEffect, useState }  from 'react';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from "../services/firebase"
import { onAuthStateChanged } from "@firebase/auth";
import api from "../services/api";
import User from "../models/User"
import ErrorResponse from "../models/ErrorResponse";

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<any>(null);
  const [userBackend, setUserBackend] = useState<User|null>(null);
  const router = useRouter();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      router.push('/login');
      setUserBackend(null);
    }
  })

  useEffect(() => {
    if (user != null) {
      api.getUser(user.uid).then((r) => {
        if ("error" in r) {
          setUserBackend(null);
        } else {
          setUserBackend(r);
        }})
    }
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
