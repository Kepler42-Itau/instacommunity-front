import { ColorModeScript } from "@chakra-ui/react";
import UserContext from "../lib/UserContext";
import { useEffect, useState } from "react";
import { NextRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import Head from "next/head";
import theme from "../lib/Theme";
import User from "../models/User";
import { Box, Container, ScaleFade } from "@chakra-ui/react";
import { getUser } from "../lib/Api";
import { auth } from "../lib/Firebase";

interface MainProps {
  router: NextRouter;
}

const Main: React.FC<MainProps> = ({ children, router }) => {
  const [user] = useAuthState(auth);
  const [userBackend, setUserBackend] = useState<User | null>(null);

  useEffect(() => {
    if (user != null) {
      getUser(user.uid).then((res) => {
        if ("error" in res) {
          setUserBackend(null);
        } else {
          setUserBackend(res);
        }
      });
    } else {
      setUserBackend(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Box>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <UserContext.Provider value={{ user, userBackend, setUserBackend }}>
        <ScaleFade key={router.route} in={true}>
          <Head>
            <link rel="icon" href="/favicon.ico" />
            <title>InstaCommunity</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Head>
          <Container maxW="container.xl" centerContent>
            {children}
          </Container>
        </ScaleFade>
      </UserContext.Provider>
    </Box>
  );
};

export default Main;
