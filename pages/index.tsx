import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import CommunityList from "../components/CommunityList";
import NavBar from "../components/NavBar";
import api from "../services/api"

const Home: NextPage = () => {
  const [list, setList] = React.useState([]);
  const router = useRouter()
  const userId: Number = router.query.userId as unknown as Number || 1;

  useEffect(() => {
    api.getFollowedCommunities(userId)
  }, [])

  return (
    <>
      <NavBar profile={true} home={false} />
      <CommunityList list={list} />
    </>
  );
};

export default Home;
