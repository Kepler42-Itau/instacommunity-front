import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Head from "next/head";
import { NextRouter, useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import {
  Center,
  Heading,
  Text,
  Flex,
  Button,
  Box,
  Avatar,
  useToast,
} from "@chakra-ui/react";
import NavBar from "../../../components/NavBar";
import User from "../../../models/User";
import Contact from "../../../models/Contact";
import Community from "../../../models/Community";
import {
  followCommunity,
  unfollowCommunity,
  getCommunity,
  getCommunityFollowers,
} from "../../../lib/MockApi";
import UserContext from "../../../lib/UserContext";

const CommunityPage = ({
  community,
  followers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const toast = useToast();
  const router = useRouter();

  const handleToast = (ok: Boolean) => {
    if (!ok) {
      toast({
        title: "Erro",
        description: "Contate um administrador.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Head>
        <title>{community.name}</title>
      </Head>
      <Flex flexDirection="column" height="100vh">
        <NavBar />
        <Flex>
          <CommunityItem
            community={community}
            followers={followers}
            router={router}
            toast={handleToast}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

interface CommunityItemProps {
  community: Community;
  followers: User[];
  router: NextRouter;
  toast: Function;
}

const CommunityItem = ({
  community,
  followers,
  router,
  toast,
}: CommunityItemProps) => {
  const { id } = router.query;
  const { userBackend } = useContext(UserContext);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (followers.some((follower: User) => follower.id === userBackend?.id)) {
      setIsFollowing(true);
    }
  }, []);

  const handleFollowClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const communityId = id?.toString()!;
    followCommunity(communityId, userBackend?.id).then((res) => {
      const ok = "id" in res;
      if (ok) setIsFollowing(true);
      toast(ok);
    });
  };

  const handleUnfollowClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const communityId = id?.toString()!;
    unfollowCommunity(communityId, userBackend?.id).then((res) => {
      const ok = "id" in res;
      if (ok) setIsFollowing(false);
      toast(false);
    });
  };

  return (
    <Box mt="3%" p="10%" pt="2%" pb="0%" justifyContent="end">
      <Flex
        boxShadow="xl"
        p="6%"
        pt="2%"
        pb="2%"
        bg="white"
        rounded="lg"
        borderRadius="lg"
        flexDirection="column"
      >
        <Center width="100%">
          <Avatar mr="auto" name={community.name} size="2xl" />
          <Heading fontSize="6xl" ml="auto" mr="auto">
            {community.name}
          </Heading>
          {isFollowing ? (
            <Button
              title="Deixar de seguir"
              colorScheme="blue"
              variant="outline"
              ml="1%"
              size="lg"
              onClick={handleUnfollowClick}
            >
              Seguindo
            </Button>
          ) : (
            <Button
              title="Seguir comunidade"
              colorScheme="blue"
              size="lg"
              ml="1%"
              onClick={handleFollowClick}
            >
              Seguir
            </Button>
          )}
        </Center>
        <Box
          mt="3%"
          p="10%"
          pt="2%"
          pb="2%"
          justifyContent="end"
          boxShadow="base"
          bg="gray.50"
          rounded="lg"
          borderRadius="lg"
        >
          <Text textAlign="center" fontSize="2xl">
            {community.description}
          </Text>
        </Box>
        <Flex>
          <Box flex="2" mt="2%" mr="auto">
            {community.contacts.map((contact: Contact, index: number) => (
              <Button
                key={index}
                colorScheme="blue"
                size="lg"
                mr="2%"
                onClick={() => window.open(`${contact.link}`, "_blank")}
              >
                {contact.title}
              </Button>
            ))}
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;
  const community = await getCommunity(id as string);
  const followers = await getCommunityFollowers(id as string);

  return {
    props: {
      community,
      followers,
    },
  };
};

export default CommunityPage;
