import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import CommunityList from "../components/CommunityList";
import NavBar from "../components/NavBar";
import Community from "../models/Community";
import api from "../services/api";

const Home: NextPage = () => {
  const [list, setList] = React.useState<Community[]>([]);
  const router = useRouter();
  const userId = router.query.userId?.toString() || "1";

  useEffect(() => {
    if (!router.isReady) return;

    const showCommunities = async () => {
      const list = await api.getFollowedCommunities(userId);
      setList(list);
    };
    showCommunities();
  }, [router.isReady]);

  return (
    <>
      <NavBar profile={true} home={false} />
      <CommunityList list={list} />
    </>
  );
};

export default Home;
