import type { NextPage } from 'next';
import React, { useState } from 'react';
import Head from 'next/head';
import { Button, ButtonGroup, Heading, Center } from "@chakra-ui/react";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Instacommunity</title>
      </Head>
      <Center>
        <Heading>Instacommunity</Heading>
      </Center>
    </div>
  );
};

export default Home;
