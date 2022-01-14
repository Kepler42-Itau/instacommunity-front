import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState, useEffect, useContext } from "react";
import CommunityList from "../components/CommunityList";
import NavBar from "../components/NavBar";
import Community from "../models/Community";
import api from "../services/api";
import {Center, Text, Flex, Spacer, Box, Divider} from "@chakra-ui/react";
import { UserContext } from '../lib/UserContext'
import {GetServerSideProps} from "next";

const Home: NextPage = (props: any) => {
  const {user, userBackend} = useContext(UserContext);
  const [communitiesList, setCommunitiesList] = React.useState<Community[]>([]);
  const router = useRouter();


  useEffect(() => {
    if (!router.isReady) return;

    if (userBackend != null) {
      // @ts-ignore
      api.getFollowedCommunities(userBackend.id).then((res) => setCommunitiesList(res));
    }
  }, [userBackend]);

  return (
    <>
      <NavBar />
      <Flex flexDirection="row">
        <Flex flexDirection="column" flexBasis="100%" >
          <Center ><Text mt="3%">Comunidades seguidas: </Text></Center><CommunityList list={communitiesList} />
        </Flex>
        <Flex flexDirection="column">
          <Center ><Text mt="3%">Lista de Comunidades: </Text></Center><CommunityList list={props.list} />
        </Flex>
      </Flex>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const list = await api.searchCommunity('');

  return {
    props: {
      list
    },
  };
};
