// localhost/commumities/1
// POST http://localhost:8080/commumities/1/followers

import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import React, { useState } from 'react';

import { Button, ButtonGroup } from "@chakra-ui/react"
import { Flex, Spacer } from "@chakra-ui/react"
import { Box } from "@chakra-ui/react"
import { HStack, Center, Heading } from "@chakra-ui/react"

const Community: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const userId = 1;

  const isFollowing = false;

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    // fetch(`https://requestinspector.com/inspect/01fm5wm5hk740z2ms0e7kqz7kj`, {
    fetch(`http://localhost:8080/communities/${id}/followers`, {
      method: 'POST',
      headers: [
        ['Content-Type', 'application/json']
      ],
      body: JSON.stringify({
        id: userId,
        name: "Ada"
      }),

    }).then(res => res.json())
    .then(res => {

    })
  };
  
  return (
    <Box>
      <Head>
        <title>Kotlin</title>
      </Head>
      <Center w="100px">
<HStack spacing="24px">
        <Heading>Kotlin</Heading>
        <Button isDisabled={isFollowing} colorScheme="blue" onClick={handleClick}>Seguir</Button>
      </HStack>

      </Center>
          </Box>
  );
};

export default Community;
