import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Head from "next/head";
import { NextRouter, useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import {
  Center,
  AvatarGroup,
  Heading,
  Tooltip,
  Text,
  Flex,
  useDisclosure,
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
import FollowersModal from "../../components/FollowersModal";
import {
  followCommunity,
  unfollowCommunity,
  getCommunityBySlug,
  getCommunityFollowers,
} from "../../lib/Api";
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
      <Flex
        pt="2%"
        pr={{ base: "2%", xl: "10%" }}
        pl={{ base: "2%", xl: "10%" }}
        pb="5%"
      >
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
  const { userBackend } = useContext(UserContext);
  const [isFollowing, setIsFollowing] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (followers.some((follower: User) => follower.id === userBackend?.id)) {
      setIsFollowing(true);
    }
  }, [userBackend]);

  return (
    <Flex
      width="100%"
      boxShadow="xl"
      p="5%"
      rounded="lg"
      borderRadius="lg"
      flexDirection="column"
    >
      <Center
        justifyContent="center"
        flexDirection={{ base: "column", md: "row" }}
        width="100%"
      >
        <Flex
          flex="1"
          justifyContent="start"
          mt={{ base: "5%", md: "0%" }}
          ml={{ md: "auto" }}
          mr={{ md: "2%" }}
        >
          <Avatar
            mr="auto"
            name={community.name}
            src={community.photoURL as string}
            size="2xl"
          />
        </Flex>
        <Flex
          flex="5"
          justifyContent="center"
          mb={{ base: "5%", md: "0%" }}
          mt={{ base: "5%", md: "0%" }}
          alignSelf="center"
        >
          <Heading fontSize={{ base: "4xl", md: "6xl" }} ml="auto" mr="auto">
            {community.name}
          </Heading>
        </Flex>
        {userBackend?.id === community.admin && (
          <Flex flex="1" ml="1%" justifyContent="end" mr={{ md: "auto" }}>
            <SettingsModal
              id={`${community.id}`}
              ml="auto"
              contacts={community.contacts}
              community={community}
            />
          </Flex>
        )}
        <FollowButton
          id={`${community.id}`}
          isFollowing={isFollowing}
          setIsFollowing={setIsFollowing}
          toast={toast}
          type={community.type}
        />
      </Center>
      <Box
        mt={{ base: "10%", md: "3%" }}
        mb={{ base: "10%", md: "0%" }}
        p="10%"
        pt="2%"
        pb="2%"
        justifyContent="end"
        boxShadow="base"
        rounded="lg"
        borderRadius="lg"
      >
        <Text textAlign="center" fontSize={{ base: "lg", md: "2xl" }}>
          {community.description}
        </Text>
      </Box>
      <Flex
        mt="4%"
        mr="2%"
        ml="2%"
        alignItems={{ base: "center", md: "start" }}
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="center"
      >
        {isFollowing && <ContactBox contacts={community.contacts} />}
        <FollowersModal
          followers={followers}
          isOpen={isOpen}
          onClose={onClose}
          router={router}
        />
        <FollowersBox followers={followers} onOpen={onOpen} />
      </Flex>
    </Flex>
  );
};

interface FollowButtonProps {
  id: string | string[] | undefined;
  isFollowing: boolean;
  setIsFollowing: Function;
  toast: Function;
  type: string;
}

const FollowButton = ({
  id,
  isFollowing,
  setIsFollowing,
  toast,
  type,
}: FollowButtonProps) => {
  const { userBackend } = useContext(UserContext);

  const handleFollowClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const communityId = id?.toString()!;
    if (type == "MODERATED") {
      // TODO: Implement the following code
      // requestFollowCommunity(communityId, userBackend?.id as string).then((res) => {
      // if ("error" in res) toast("Error");
      // else toast("Requisição feita com sucesso");
      //})
    } else {
      followCommunity(communityId, userBackend?.id as string).then((res) => {
        if (res) setIsFollowing(true);
        toast(res);
      });
    }
  };

  const handleUnfollowClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const communityId = id?.toString()!;
    unfollowCommunity(communityId, userBackend?.id as string).then((res) => {
      if (res) setIsFollowing(false);
      toast(res);
    });
  };

  const UnfollowButton = () => {
    return (
      <Button
        title="Deixar de seguir"
        colorScheme="blue"
        variant="outline"
        ml="2%"
        size="lg"
        onClick={handleUnfollowClick}
      >
        Seguindo
      </Button>
    );
  };

  const FollowButton = () => {
    return (
      <Button
        title="Seguir comunidade"
        colorScheme="blue"
        size="lg"
        ml="2%"
        onClick={handleFollowClick}
      >
        Seguir
      </Button>
    );
  };

  return (
    <>
      {type === "MANAGED" ? (
        <></>
      ) : isFollowing ? (
        <UnfollowButton />
      ) : (
        <FollowButton />
      )}
    </>
  );
};

interface FollowersBoxProps {
  followers: User[];
  onOpen: () => void;
}

const FollowersBox = ({ followers, onOpen }: FollowersBoxProps) => {
  return (
    <Tooltip label="Lista de Seguidores" aria-label="Lista de Seguidores">
      <AvatarGroup size="md" max={3} onClick={onOpen} cursor="pointer">
        {followers.map((user: User, index: number) => (
          <Avatar key={index} name={user.name} src={user.photoURL as string} />
        ))}
      </AvatarGroup>
    </Tooltip>
  );
};

interface ContactBoxProps {
  contacts: Contact[];
}

const ContactBox = ({ contacts }: ContactBoxProps) => {
  return (
    <Flex
      flexDirection={{ base: "column", md: "row" }}
      mb={{ base: "10%", md: "0%" }}
      flex="2"
    >
      {contacts
        .filter(
          (contact: Contact) => contact.link !== "" || contact.title !== ""
        )
        .map((contact: Contact, index: number) => (
          <Button
            key={index}
            colorScheme="blue"
            size="lg"
            mr={{ md: "2%" }}
            mb={{ base: "4%", md: "0%" }}
            onClick={() => window.open(`${contact.link}`, "_blank")}
          >
            {contact.title}
          </Button>
        ))}
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;
  const community = await getCommunityBySlug(id as string);
  const followers = await getCommunityFollowers(
    `${(community as Community)?.id}`
  );

  return {
    props: {
      community,
      followers,
    },
  };
};

export default CommunityPage;
