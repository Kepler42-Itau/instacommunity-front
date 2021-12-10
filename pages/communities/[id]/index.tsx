import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import React, { useState, useEffect } from "react";

import { Button, ButtonGroup } from "@chakra-ui/react";
import { Box, Link } from "@chakra-ui/react";
import { HStack, VStack, Center, Heading, Text, Flex } from "@chakra-ui/react";
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import { LinkIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";

import NavBar from "../../../components/NavBar";
import ContactModal from "../../../components/ContactModal";

import User from "../../../models/User";
import UserCommunity from "../../../models/UserCommunity";
import api from "../../../services/api";

const Community: NextPage = (props: any) => {
  const toast = useToast();
  const followers = props.list;
  const [showFollowers, setShowFollowers] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const router = useRouter();
  const { id } = router.query;
  const userId = router.query.userId || 1;
  const name = "Ada";

  const handleToast = (ok: Boolean) => {
    if (!ok) {
      toast({
        title: "Erro",
        description: "Contate um administrador.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleFollowClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const userId = router.query.userId?.toString()!
    const communityId = id?.toString()!
    api
      .followCommunity(communityId, userId)
      .then((res) => {
        const ok = "id" in res
        if (ok) setIsFollowing(true);
        handleToast(ok);
      });
  };

  const handleUnfollowClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const userId = router.query.userId?.toString()!
    const communityId = id?.toString()!
    api
      .unFollowCommunity(communityId, userId)
      .then((res) => {
      const ok = "id" in res
      if (ok) setIsFollowing(false);
      handleToast(false);
    });
  };

  const handleFollowerClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setShowFollowers(!showFollowers);
  };

  useEffect(() => {
    console.log("User id is ", userId);
    if (followers.some((follower: User) => follower.id === userId)) {
      setIsFollowing(true);
    }
  }, []);

  return (
    <Box>
      <Head>
        <title>{props.data.name}</title>
      </Head>
      <NavBar profile={false} home={true} />
      <Center mt="2%">
        <Avatar name={props.data.name} size="2xl" />
      </Center>
      <Center h="100px">
        <HStack spacing="24px">
          <Text fontSize="4xl">{props.data.name}</Text>
          {isFollowing && (
            <Button
              title="Deixar de seguir"
              colorScheme="blue"
              variant="outline"
              onClick={handleUnfollowClick}
            >
              Seguindo
            </Button>
          )}
          {!isFollowing && (
            <Button
              title="Seguir comunidade"
              colorScheme="blue"
              onClick={handleFollowClick}
            >
              Seguir
            </Button>
          )}
        </HStack>
      </Center>
      <Center>
        <Text fontSize="2xl">{props.data.description}</Text>
      </Center>
      <Center>
        <VStack spacing="4%">
          <HStack spacing="4%">
            {props.data.contact && (
              <Button
                md="1%"
                colorScheme="blue"
                onClick={() => window.open(`${props.data.contact}`, "_blank")}
              >
                Contato 1
              </Button>
            )}
            {props.data.contact2 && (
              <Button
                md="1%"
                colorScheme="blue"
                onClick={() => window.open(`${props.data.contact2}`, "_blank")}
              >
                Contato 2
              </Button>
            )}
            {props.data.contact3 && (
              <Button
                md="1%"
                colorScheme="blue"
                onClick={() => window.open(`${props.data.contact3}`, "_blank")}
              >
                Contato 3
              </Button>
            )}
          </HStack>
          <ContactModal
            id={id}
            contacts={[
              props.data.contact,
              props.data.contact2,
              props.data.contact3,
            ]}
          />
          <Button md="1%" colorScheme="blue" onClick={handleFollowerClick}>
            Mostrar membros
          </Button>
        </VStack>
      </Center>
      <Center>
        {showFollowers && (
          <List w="20%">
            {followers.map((follower: any, index: any) => {
              return (
                <ListItem
                  key={follower.id}
                  onClick={() => router.push(`/user/${follower.id}`)}
                  cursor="pointer"
                  w="100%"
                >
                  <Flex
                    border="1px"
                    borderColor="gray.200"
                    borderRadius="md"
                    m="3%"
                  >
                    <Avatar name={follower.name} size="sm" m="4%" />
                    <Box ml="0%" m="4%">
                      <Text fontSize="md">{follower.name}</Text>
                    </Box>
                  </Flex>
                </ListItem>
              );
            })}
          </List>
        )}
      </Center>
    </Box>
  );
};

import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;
  if (id == null) return { props: {} };
  const data = await api.getCommunityPage(id as string);
  const list = await api.getCommunitiesFollowers(id as string);

  return {
    props: {
      data,
      list,
    },
  };
};

export default Community;
