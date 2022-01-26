import { useState, useEffect, useContext } from "react";
import UserContext from "../lib/UserContext";
import CommunityGrid from "../components/CommunityGrid";
import NavBar from "../components/NavBar";
import Community from "../models/Community";
import { getFollowedCommunities, getCommunities } from "../lib/Api";
import { Flex, Box, Text } from "@chakra-ui/react";
import { NextRouter, useRouter } from "next/router";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

interface ContentProps {
  flex: number;
  communityList: Community[];
  router: NextRouter;
}

const MainContent = ({ flex, communityList, router }: ContentProps) => {
  return (
    <Flex
      flex={flex}
      flexDirection="column"
      alignItems="center"
      mb={{ base: "5%", xl: "0%" }}
      mr={{ base: "0%", xl: "5%" }}
      width="100%"
    >
      <Text> Comunidades recentes: </Text>
      <CommunityGrid router={router} communityList={communityList} />
    </Flex>
  );
};

const SideContent = ({ flex, communityList, router }: ContentProps) => {
  return (
    <Flex flex={flex} flexDirection="column" alignItems="center" width="100%">
      <Text> Suas comunidades: </Text>
      <CommunityGrid router={router} communityList={communityList} />
    </Flex>
  );
};

const HomePage = ({
  communityList,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { userBackend } = useContext(UserContext);
  const [followedCommunityList, setFollowedCommunityList] = useState<
    Community[]
  >([]);
  const router = useRouter();

  useEffect(() => {
    if (userBackend != null) {
      getFollowedCommunities(userBackend.id).then((res) =>
        setFollowedCommunityList(res)
      );
    }
  }, [userBackend]);

  return (
    <Box maxW="100vw" width="100%" mx="auto" px={{ base: 2, sm: 12, md: 17 }}>
      <NavBar />
      <Flex flexDirection={{ base: "column", xl: "row" }} pt="2%" pb="5%">
        <MainContent flex={1} router={router} communityList={communityList} />
        <SideContent
          flex={1}
          router={router}
          communityList={followedCommunityList}
        />
      </Flex>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const communityList = await getCommunities();
  // TODO: Remove this later
  const xpto = communityList.slice(0, 4);

  return {
    props: { communityList: xpto },
  };
};

export default HomePage;
