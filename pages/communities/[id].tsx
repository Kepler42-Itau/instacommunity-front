import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, {useState, useEffect, useContext} from "react";
import { Box, Button, Center, Heading, Text, Flex, Avatar, AvatarGroup, useDisclosure, Tooltip  } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import NavBar from "../../components/NavBar";
import FollowersModal from "../../components/FollowersModal"
import SettingsModal from "../../components/SettingsModal";
import User from "../../models/User";
import api from "../../services/api";

const Community: NextPage = (props: any) => {
  const toast = useToast();
  const [followers, setFollowers] = useState(props.list);
  const [showFollowers, setShowFollowers] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const { user, userBackend } = useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
    const userId = userBackend?.id;
    const communityId = id?.toString()!;
    api.followCommunity(communityId, userId).then((res) => {
      if (res) setIsFollowing(true);
    });
  };

  const handleUnfollowClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const userId = userBackend?.id;
    const communityId = id?.toString()!;
    api.unFollowCommunity(communityId, userId).then((res) => {
      console.log({res});
      if (res) setIsFollowing(false);
      console.log(isFollowing);
      handleToast(res);
    });
  };

  useEffect(() => {
    api.getCommunitiesFollowers(id as string).then((res) => setFollowers(res));
  }, [isFollowing]);

  // @ts-ignore
  useEffect(() => {
    if (userBackend != null)
      if (followers.some((follower: User) => follower.id === userBackend.id)) {
        setIsFollowing(true);
      }
  }, [userBackend])

  return (
    <Box>
      <Head>
        <title>{props.data.name}</title>
      </Head>
      <Flex flexDirection="column" height="100vh">
        <NavBar />
        <Box
          mt="3%"
          p="12%"
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
                <Avatar mr="6%" name={props.data.name} size="2xl" />
                <Heading fontSize="6xl" ml="auto" mr="auto">
                  {props.data.name}
                </Heading>
                {
                  (userBackend?.id === props.data.creator) && <SettingsModal id={id} ml="auto" contacts={contacts} community={props.data}/>
                }
                {isFollowing &&
                  <Tooltip label="Deixar de seguir" aria-label="tooltip">
                    <Button
                      colorScheme="blue"
                      variant="outline"
                      ml="1%"
                      size="lg"
                      onClick={handleUnfollowClick}
                    >
                      Seguindo
                    </Button>
                  </Tooltip>

                }
                {!isFollowing &&
                  <Tooltip label="Seguir comunidade" aria-label="tooltip">
                  <Button
                    colorScheme="blue"
                    size="lg"
                    ml="1%"
                    onClick={handleFollowClick}
                  >
                    Seguir
                  </Button>
                  </Tooltip>
                }
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
              <Flex mt="1%">
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
                <Flex flex="2" mt="2%" ml="auto" justifyContent="end" flexDirection="row">
                  <Tooltip label="Seguidores" aria-label='tooltip'>
                  <AvatarGroup size='md' justifyContent="end" max={5} cursor="pointer" onClick={onOpen}>
                    {followers.map((follower: User, index: number) => (
                      follower.usePhoto ? (<Avatar name={follower.name} src={follower.photoURL} key={index} /> ) : (<Avatar name={follower.name} key={index} />)
                    ))}
                  </AvatarGroup>
                  </Tooltip>
                  <FollowersModal followers={followers} isOpen={isOpen} onClose={onClose} />

                </Flex>
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
      list
    },
  };
};

export default Community;
