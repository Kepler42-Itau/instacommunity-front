import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState, useEffect, useContext } from "react";
import CommunityList from "../components/CommunityList";
import NavBar from "../components/NavBar";
import Community from "../models/Community";
import api from "../services/api";
import { Center, Text } from "@chakra-ui/react";
import { UserContext } from '../lib/UserContext'


const Home: NextPage = () => {
  const {user, userBackend} = useContext(UserContext);
  const [communitiesList, setCommunitiesList] = React.useState<Community[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    if (user !== null) {
      api.getFollowedCommunities(user.id).then((r) => {
            if ("error" in r)
              return;
            else
              setCommunitiesList(r)});
    }
  }, [user]);

  return (
    <>
      <NavBar />
      <Center>
        <Text mt="3%">Comunidades que você está seguindo: </Text>
      </Center>
      <CommunityList list={communitiesList} />
    </>
  );
};

export default Home;
