import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, {useState, useEffect, useContext} from "react";
import {
  Box,
  Button,
  Center,
  Heading,
  Text,
  Flex,
  Avatar,
  AvatarGroup,
  useDisclosure,
  Tooltip,
  IconButton
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import NavBar from "../../components/NavBar";
import FollowersModal from "../../components/FollowersModal"
import SettingsModal from "../../components/SettingsModal";
import User from "../../models/User";
import api from "../../services/api";

const User: NextPage = (props: any) => {
  const { user, userBackend } = useContext(UserContext);
  const toast = useToast();
  const followed = props.list;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  return (
    <Box>
      <Head>
        <title>{props.data.name}</title>
      </Head>
      <Flex flexDirection="column" height="100vh">
        <NavBar />
        <Box
          mt="3%"
          p="10%"
          pt="2%"
          pb="0%"
          justifyContent="end"
          border="px"
          borderColor="gray.100"
        >
          <Box>

            <Flex
              boxShadow="xl"
              p="6%"
              pt="2%"
              pb="2%"
              rounded="lg"
              borderRadius="lg"
              flexDirection="column"
            >

              <Center width="100%">
{ props.data.usePhoto ? (<Avatar mr="3%" name={props.data.name} src={props.data.photoURL} size="2xl" />) : (<Avatar mr="3%" name={props.data.name} size="2xl" />)}
                <Flex flexDirection="column" justifyContent="start">
                <Heading textAlign="left" fontSize="6xl">
                  {props.data.name}
                </Heading>
                <Heading textAlign="left">
                  {props.data.occupation}
                </Heading>
                </Flex>
                <Flex justifyContent="end" ml="auto">
  {
                  (userBackend?.id === props.data.id) &&
                  <IconButton aria-label='Configurações de usuário' colorScheme="blue" size="lg"
                              onClick={() => router.push('/user/settings')} icon={<EditIcon/>}/>
                }
                </Flex>

              </Center>
              <Text mt="2%" >Suas Badges de comunidade: </Text>
              <Box
                mt="3%"
                p="10%"
                pt="2%"
                pb="2%"
                justifyContent="end"
                boxShadow="base"
                rounded="lg"
                borderRadius="lg"
              >
                <Text textAlign="center" fontSize="2xl">
                  <Tooltip label="Badge" aria-label='tooltip'>
                    <AvatarGroup size='lg' cursor="pointer" onClick={onOpen}>
                      {followed.map((follower: User, index: number) => (
                        <Avatar name={follower.name} key={index} onClick={() => router.push(`/communities/${follower.id}`)} />
                      ))}
                    </AvatarGroup>
                  </Tooltip>
                  {/*<FollowersModal followers={followed} isOpen={isOpen} onClose={onClose} />*/}
                </Text>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

import { GetServerSideProps } from "next";
import { UserContext } from "../../lib/UserContext";
import {EditIcon} from "@chakra-ui/icons";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;
  let list;
  if (id == null) return {props: {}};
  const data = await api.getUserByName(id as string);
  if ("id" in data) {
    list = await api.getFollowedCommunitiesByName(data.id);
  }

  return {
    props: {
      data,
      list,
    },
  };
}

export default User;
