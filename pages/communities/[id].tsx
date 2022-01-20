import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Head from "next/head";
import { NextRouter, useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import {
  Center,
  AvatarGroup,
  Heading,
  Text,
  Flex,
  Button,
  Box,
  Avatar,
  useToast,
} from "@chakra-ui/react";
import NavBar from "../../components/NavBar";
import User from "../../models/User";
import Contact from "../../models/Contact";
import Community from "../../models/Community";
import SettingsModal from "../../components/SettingsModal";
import {
  followCommunity,
  unfollowCommunity,
  getCommunity,
  getCommunityFollowers,
} from "../../lib/MockApi";
import UserContext from "../../lib/UserContext";

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
    <Box maxW="100vw" width="100%" mx="auto" px={{ base: 2, sm: 12, md: 17 }}>
      <Head>
        <title>{community.name}</title>
      </Head>
      <NavBar />
      <Flex pt="2%" pr="10%" pl="10%" pb="5%">
        <CommunityItem
          community={community}
          followers={followers}
          router={router}
          toast={handleToast}
        />
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
    followCommunity(communityId, userBackend?.id as string).then((res) => {
      if (res) setIsFollowing(true);
      toast(res);
    });
  };

  const handleUnfollowClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const communityId = id?.toString()!;
    unfollowCommunity(communityId, userBackend?.id as string).then((res) => {
      if (res) setIsFollowing(false);
      toast(res);
    });
  };

  return (
    <Flex
      width="100%"
      boxShadow="xl"
      p="5%"
      bg="white"
      rounded="lg"
      borderRadius="lg"
      flexDirection="column"
    >
      <Center justifyContent="center" width="100%">
        <Flex flex="1" justifyContent="start" ml="auto">
          <Avatar
            mr="auto"
            name={community.name}
            src={community.photoURL as string}
            size="2xl"
          />
        </Flex>
        <Flex flex="5" justifyContent="center" alignSelf="center">
          <Heading fontSize="6xl" ml="auto" mr="auto">
            {community.name}
          </Heading>
        </Flex>
        {userBackend?.id === community.admin && (
          <SettingsModal
            id={id}
            ml="auto"
            contacts={community.contacts}
            community={community}
          />
        )}
        <Flex flex="1" justifyContent="end" mr="auto">
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
        </Flex>
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
          {community.description}
        </Text>
      </Box>
      <Flex mt="4%" mr="2%" ml="2%" justifyContent="center">
        <ContactBox contacts={community.contacts} />
        <FollowersBox followers={followers} />
      </Flex>
    </Flex>
  );
};

interface FollowersBoxProps {
  followers: User[];
}

const FollowersBox = ({ followers }: FollowersBoxProps) => {
  return (
    <AvatarGroup size="md" max={3}>
      {followers.map((user: User, index: number) => (
        <Avatar key={index} name={user.name} src={user.photoURL as string} />
      ))}
    </AvatarGroup>
  );
};

interface ContactBoxProps {
  contacts: Contact[];
}

const ContactBox = ({ contacts }: ContactBoxProps) => {
  return (
    <Box flex="2">
      {contacts.map((contact: Contact, index: number) => (
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
