import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, {useState, useEffect, useContext} from "react";
import { Box, Button, Center, Heading, Text, Flex, Avatar, AvatarGroup } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import NavBar from "../../components/NavBar";
import FollowersModal from "../../components/FollowersModal"
import ContactModal from "../../components/ContactModal";
import User from "../../models/User";
import api from "../../services/api";

const Community: NextPage = (props: any) => {
  const toast = useToast();
  const followers = props.list;
  const [showFollowers, setShowFollowers] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const { user, userBackend } = useContext(UserContext);

  const router = useRouter();
  const { id } = router.query;

  const contacts = [
    props.data.contact,
    props.data.contact2,
    props.data.contact3,
  ];

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

  const handleFollowClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const userId = router.query.userId?.toString()!;
    const communityId = id?.toString()!;
    api.followCommunity(communityId, userId).then((res) => {
      const ok = "id" in res;
      if (ok) setIsFollowing(true);
      handleToast(ok);
    });
  };

  const handleUnfollowClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const userId = router.query.userId?.toString()!;
    const communityId = id?.toString()!;
    api.unFollowCommunity(communityId, userId).then((res) => {
      const ok = "id" in res;
      if (ok) setIsFollowing(false);
      handleToast(false);
    });
  };

  const handleFollowerClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setShowFollowers(!showFollowers);
  };

  useEffect(() => {
    if (followers.some((follower: User) => follower.id === userBackend.id)) {
      setIsFollowing(true);
    }
  }, [])

  return (
    <Box>
      <Head>
        <title>{props.data.name}</title>
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
          <Box>
            <Flex
              boxShadow="xl"
              p="6%"
              pt="2%"
              pb="2%"
              rounded="lg"
              borderRadius="lg"
              flexDirection="column"
            >
              <Center width="100%">
                <Avatar mr="auto" name={props.data.name} size="2xl" />
                <Heading fontSize="6xl" ml="auto" mr="auto">
                  {props.data.name}
                </Heading>
                {
                  (userBackend.id === props.data.creator) && <ContactModal id={id} ml="auto" contacts={contacts} />
                }
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
                rounded="lg"
                borderRadius="lg"
              >
                <Text textAlign="center" fontSize="2xl">
                  {props.data.description}
                </Text>
              </Box>
              <Flex>
                <Box flex="2" mt="2%" mr="auto">
                  {contacts.filter((contact) => {return contact != ""}).map((contact: string, index: number) => (
                    <Button
                      key={index}
                      colorScheme="blue"
                      size="lg"
                      mr="2%"
                      onClick={() => window.open(`${contact}`, "_blank")}
                    >
                      Contato {index + 1}
                    </Button>
                  ))}
                </Box>
                <Box>
                  <AvatarGroup size='md' max={3}>
                    {followers.map((follower: User, index: number) => (
                      <Avatar name={follower.name} key={index} />
                    ))}
                  </AvatarGroup>
                  <FollowersModal ml="auto" followers={followers} />
                </Box>
              </Flex>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

import { GetServerSideProps } from "next";
import {UserContext} from "../../lib/UserContext";
import {AiOutlineVerticalAlignTop} from "react-icons/all";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;
  if (id == null) return { props: {} };
  const data = await api.getCommunityPage(id as string);
  const list = await api.getCommunitiesFollowers(id as string);

  return {
    props: {
      data,
      list,
    },
  };
};

export default Community;
