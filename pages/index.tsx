import { useState, useEffect, useContext } from "react";
import UserContext from "../lib/UserContext";
import CommunityList from "../components/CommunityList";
import NavBar from "../components/NavBar";
import Community from "../models/Community";
import { getFollowedCommunities } from "../lib/MockApi";
import { Flex, Box } from "@chakra-ui/react";

const HomePage = () => {
  const { userBackend } = useContext(UserContext);
  const [communitiesList, setCommunitiesList] = useState<Community[]>([]);

  useEffect(() => {
    if (userBackend != null) {
      getFollowedCommunities(userBackend.id).then((res) =>
        setCommunitiesList(res)
      );
    }
  }, [userBackend]);

  return (
    <Box maxW="100vw" mx="auto" px={{ base: 2, sm: 12, md: 17 }}>
      <NavBar />
      <Flex flexDirection="column" pt="1%" pb="5%">
        <CommunityList list={communitiesList} />
      </Flex>
    </Box>
  );
};

export default HomePage;
