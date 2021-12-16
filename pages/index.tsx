import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import CommunityList from "../components/CommunityList";
import NavBar from "../components/NavBar";
import Community from "../models/Community";
import api from "../services/api";
import {Center, Text} from "@chakra-ui/react";

const Home: NextPage = () => {
  const [communitiesList, setCommunitiesList] = React.useState<Community[]>([]);
  const router = useRouter();
  const userId = router.query.userId?.toString() || "1";

  useEffect(() => {
    if (!router.isReady) return;

    api
      .getFollowedCommunities(userId)
      .then(setCommunitiesList);

  }, [router.isReady, userId]);

  return (
    <>
      <NavBar />
      <Center>
        <Text mt="8px" >Comunidades que você está seguindo: </Text>
      </Center>
      <CommunityList list={communitiesList} />
    </>
  );
};

export default Home;
