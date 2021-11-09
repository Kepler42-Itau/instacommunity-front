import type { NextPage } from 'next';
import React, { useState } from 'react';
import Head from 'next/head';
import { Button, ButtonGroup } from "@chakra-ui/react";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Instacommunity</title>
      </Head>
      <h1>este é o index</h1>
      <Button colorScheme="blue">Seguir</Button>
    </div>
  );
};

export default Home;
