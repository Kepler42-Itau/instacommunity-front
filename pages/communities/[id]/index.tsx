// localhost/commumities/1
// POST http://localhost:8080/commumities/1/followers

import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import React, { useState, useEffect } from 'react';

import { Button, ButtonGroup } from "@chakra-ui/react"
import { Box, Link } from "@chakra-ui/react"
import { HStack, Center, Heading, Text } from "@chakra-ui/react"
import { List, ListItem, ListIcon, OrderedList, UnorderedList } from "@chakra-ui/react"
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react"
import { LinkIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";

const Community: NextPage = (props: any) => {
  const toast = useToast()
  const followers = props.list;
  const [showFollowers, setShowFollowers] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)

  const router = useRouter();
  const { id } = router.query;
  const userId = 1;

  console.log({props});

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    fetch(`http://localhost:8080/communities/${id}/followers`, {
      method: 'POST',
      headers: [
        ['Content-Type', 'application/json']
      ],
      body: JSON.stringify({
        id: userId,
        name: "Ada"
      }),
    }).then(res => setIsFollowing(res.ok))
  };

  const handleFollowerClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setShowFollowers(!showFollowers)
  }

  useEffect(() => {
    setIsFollowing(followers.some((follower: any) => follower.id === userId))
  },[])

  return (
    <Box>
      <Head>
        <title>{props.data.name}</title>
      </Head>
      <Center mt="2%">
        <Avatar name={props.data.name} size="2xl"/>
      </Center>
      <Center h="100px">
        <HStack spacing="24px">
          <Text fontSize="4xl">{props.data.name}</Text>
          <Button isDisabled={isFollowing} colorScheme="blue" onClick={handleClick}>Seguir</Button>
        </HStack>
      </Center>
      <Center>
        <Text fontSize="2xl">{props.data.description}</Text>
      </Center>
      <Center>
        <Link  href={props.data.contact} isExternal>
          <Button isDisabled={!props.data.contact} colorScheme="blue">Contato</Button>
        </Link>
      </Center>
      <Center>
        <Button rightIcon={<LinkIcon />} colorScheme="blue" onClick={() => router.push(`/communities/${id}/settings`)}>
          Alterar Contato
        </Button>
		  </Center>
      <Center>
        <Button colorScheme="blue" onClick={handleFollowerClick}>Mostrar membros</Button>
      </Center>
      <Center>{showFollowers && <List>
        {followers.map((follower: any, index: any) => {
          return <ListItem key={follower.id}>
            {follower.name}
            </ListItem>
        })}
      </List>}
      </Center>
    </Box>
  );
};

import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id
  if (id == null)
    return { props: {} };
  const data = await fetch(`http://localhost:8080/communities/${id}`).then(res => res.json())
  const list = await fetch(`http://localhost:8080/communities/${id}/followers`).then(res => res.json())

  return {
    props: {
      data,
      list,
    },
  }
}


export default Community;
