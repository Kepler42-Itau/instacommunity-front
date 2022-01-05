import type { NextPage } from "next";
import React, { useState, useContext  } from "react";
import Head from "next/head";
import { useRouter, } from "next/router";
import {Button, Icon, Flex, Center, useToast, Text, Box, Avatar, Heading} from "@chakra-ui/react";
import api from "../../services/api"

const User: NextPage = (props: any) => {

  const router = useRouter();
  const { id } = router.query;
  const userId = router.query.userId || 1;
  const name = "Ada";
  const contacts = [
  ];
  return (
    <Box>
      <Head>
        <title>{name}</title>
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
        </Box>
      </Flex>
    </Box>
  );
};

import { GetServerSideProps } from "next";
import NavBar from "../../components/NavBar";
import ContactModal from "../../components/ContactModal";
import Community from "../communities/[id]";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;
  if (id == null) return { props: {} };

  return {
    props: {
    },
  };
};

export default User;
