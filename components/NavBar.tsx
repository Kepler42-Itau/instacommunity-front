import {
  Button,
  Center,
  Flex,
  Container,
  Text,
  Avatar,
  useColorMode,
} from "@chakra-ui/react";
import { NextRouter, useRouter } from "next/router";
import { useContext } from "react";
import { MoonIcon, SearchIcon, SunIcon } from "@chakra-ui/icons";
import UserContext from "../lib/UserContext";

interface LogoProps {
  router: NextRouter;
}

interface SideButtonsProps {
  router: NextRouter;
}

const Logo = ({ router }: LogoProps) => {
  return (
    <Center>
      <Text
        bgGradient="linear(to-r, #FF7900, #9D4EDD)"
        bgClip="text"
        fontSize="3xl"
        fontWeight="extrabold"
        userSelect="none"
        cursor="pointer"
        _hover={{
          bgGradient: "linear(to-r, #ff6d00, #7B2CBF)",
        }}
        _active={{
          transform: "scale(0.98)",
        }}
        transition="all 0.2s ease-in-out"
        onClick={() => router.push("/")}
      >
        InstaCommunity
      </Text>
    </Center>
  );
};

const SideButtons = ({ router }: SideButtonsProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { userBackend } = useContext(UserContext);

  return (
    <Container
      centerContent
      maxW="container.xl"
      px={{ base: "inherit", md: "0%" }}
      alignItems={{ base: "center", xl: "end" }}
    >
      <Center
        flexDirection="row"
        width={{ md: "100%" }}
        justifyContent={{ md: "end" }}
      >
        <Button mr={{ base: "1%", xl: "3%" }} onClick={() => toggleColorMode()}>
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
        <Button mr={{ base: "1%", xl: "3%" }}>
          <SearchIcon />
        </Button>
        <Button
          colorScheme="orange"
          mr={{ base: "1%", xl: "3%" }}
          onClick={() => router.push("/communities/create")}
        >
          Criar Comunidade
        </Button>
        <Avatar
          name={userBackend?.name}
          src={userBackend?.photoURL as string}
          size="md"
          cursor="pointer"
          userSelect="none"
          onClick={() => router.push(`/user/${userBackend?.username}`)}
        />
      </Center>
    </Container>
  );
};

const NavBar = () => {
  const router = useRouter();

  return (
    <Flex
      p="1%"
      pt={{ base: "4%", xl: "2%" }}
      flexDirection={{ base: "column", md: "row" }}
      justifyContent="center"
      w="100%"
    >
      <Flex
        flex="1"
        justifyContent="start"
        ml="auto"
        mr={{ base: "auto", xl: "0%" }}
      >
        <Logo router={router} />
      </Flex>
      <Flex
        flex="1"
        w="100%"
        pt={{ base: "2%", md: "0%" }}
        justifyContent="end"
        mr={{ base: "0%", xl: "auto" }}
      >
        <SideButtons router={router} />
      </Flex>
    </Flex>
  );
};

export default NavBar;
