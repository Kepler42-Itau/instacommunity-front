import type { NextPage } from "next";
import React, { useState, useContext, useEffect  } from "react";
import Head from "next/head";
import { useRouter, } from "next/router";
import {Button, Icon, Flex, Center, useToast, Text, useColorModeValue, useColorMode} from "@chakra-ui/react";
import api from "../../services/api"
import { loginWithGoogle, logoutFromGoogle } from "../../services/firebase"
import { UserContext } from "../../lib/UserContext"
import NavBar from "../../components/NavBar";
import { AiOutlineGoogle } from "react-icons/ai"
import {FcGoogle} from "react-icons/fc"
import { GoogleButton } from "../../components/GoogleButton";
import {MoonIcon, SunIcon} from "@chakra-ui/icons";

const Register: NextPage = () => {
  const [name, setName] = React.useState("");
  const router = useRouter();
  const toast = useToast();
  const {user, userBackend} = useContext(UserContext);
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('white', 'gray.800');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value);

  const textValue = useColorModeValue("gray.800", "white")

  const handleLogin = () => {
    loginWithGoogle().then((r) => router.push('/'));
  }

  return (
    <>
      <Head>
        <title>InstaCommunity</title>
      </Head>
      <Flex flexDirection="column" justifyContent="Center" pt="auto" height="100vh" width="100vw" >
        <Flex pt="2%" pr="2%" justifyContent="end">
          <Center>
            <Button onClick={() => toggleColorMode()} width="100%">
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
          </Center>
        </Flex>
        <Flex flex="3" justifyContent="start" pr="20%" pl="20%" ml="auto">
          <Center flexDirection="column">
            <Text
              bgGradient="linear(to-r, #FF7900, #9D4EDD)"
              bgClip="text"
              width="100%"
              fontSize="6xl"
              fontWeight="extrabold"
              userSelect="none"
              textAlign="left"
              overflow="auto"
              _hover={{
                bgGradient: "linear(to-r, #ff6d00, #7B2CBF)",
              }}
              _active={{
                transform: "scale(0.98)",
              }}
              transition="all 0.2s ease-in-out"
            >
              InstaCommunity
            </Text>
          <Text textAlign="left" width="100%" overflow="auto">
            {"For people who seek developing bonds of knowledge with others, the challenge to find people with same interests and abilities with whom we can share, this web application is a social media to connect everyone in this category, a refreshing way of making new friends..."}
          </Text>
            <Text textAlign="left" width="100%" overflow="auto">
              {"The InstaCommunity surely will meet your expectations and likes in the most practical and fun way!"}
            </Text>
            { !user &&
              <GoogleButton
                mr="auto"
                mt="6%"
                boxShadow="base"
                transition="box-shadow 0.2s"
                _hover={{
                  boxShadow: "lg",
                }}
                size="lg"
                colorScheme="whiteAlpha"
                leftIcon={<Icon as={FcGoogle} w={8} h={8}/>}
                onClick={() => handleLogin()}
              >
                <Text color={textValue}>Sign in with Google</Text>
              </GoogleButton>}
          </Center>
        </Flex>
        {/* DO NOT DELETE THIS */}
          <Center flex="1" justifyContent="end" mr="auto" pb="auto">
          </Center>
      </Flex>
    </>
  );
};

export default Register;
