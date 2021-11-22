import type { NextPage } from "next";
import React, { useState } from "react";
import NavBar from "../components/NavBar";

const Home: NextPage = () => {
  const userId = 1;
  return (
    <NavBar profile={true} home={false} />
  );
};

export default Home;
