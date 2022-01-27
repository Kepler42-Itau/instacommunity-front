import { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Head from "next/head";
import { NextRouter, useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import {
  Center,
  IconButton,
  Heading,
  Text,
  Flex,
  Button,
  Box,
  Avatar,
  useToast,
} from "@chakra-ui/react";
import NavBar from "../../components/NavBar";
import { EditIcon } from "@chakra-ui/icons";
import User from "../../models/User";
import Community from "../../models/Community";
import { getFollowedCommunities, getUserByUsername } from "../../lib/Api";
import UserContext from "../../lib/UserContext";
import { logoutFromGoogle } from "../../lib/Firebase";
import Footer from "../../components/Footer";

const UserPage = ({
  user,
  communities,
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
        <title>{user.name}</title>
      </Head>
      <NavBar />
      <Flex
        pt="2%"
        pr={{ base: "2%", xl: "10%" }}
        pl={{ base: "2%", xl: "10%" }}
        pb="5%"
      >
        <UserItem user={user} communities={communities} router={router} />
      </Flex>
      <Footer />
    </Box>
  );
};

interface UserItemProps {
  user: User;
  communities: Community[];
  router: NextRouter;
}

const UserItem = ({ user, communities, router }: UserItemProps) => {
  const { id } = router.query;
  const { userBackend } = useContext(UserContext);

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
          alignItems="center"
          ml={{ md: "auto" }}
        >
          <Avatar
            mr="auto"
            name={user.name}
            src={user.photoURL as string}
            size="2xl"
          />
        </Flex>
        <Flex
          flex="5"
          mb={{ base: "5%", md: "0%" }}
          mt={{ base: "5%", md: "0%" }}
          ml="2%"
          flexDirection="column"
        >
          <Heading
            fontSize={{ base: "4xl", md: "6xl" }}
            textAlign={{ base: "center", md: "left" }}
          >
            {user.name}
          </Heading>
          <Text
            textAlign={{ base: "center", md: "left" }}
            as="b"
            ml={{ base: "0", md: "1" }}
            fontSize={{ base: "lg", md: "2xl" }}
          >
            {user.occupation}
          </Text>
        </Flex>
        {userBackend?.username === id && (
          <Flex>
            <Button
              onClick={() =>
                logoutFromGoogle().then(() => router.push("/login"))
              }
              size="lg"
              mr="4%"
              colorScheme="red"
            >
              Logout
            </Button>
            <IconButton
              aria-label="Configurações de usuário"
              colorScheme="blue"
              size="lg"
              onClick={() => router.push("/user/settings")}
              icon={<EditIcon />}
            />
          </Flex>
        )}
      </Center>
      <Text pt="2%" mb="1%" mt={{ base: "5%", md: "3%" }}>
        Badges Criadas:
      </Text>
      <Box
        mb={{ base: "10%", md: "0%" }}
        p="5%"
        pt="2%"
        pb="2%"
        justifyContent="end"
        boxShadow="base"
        rounded="lg"
        borderRadius="lg"
      >
        <CommunitiesBox
          router={router}
          communities={communities.filter(
            (community) => community.admin === user.id
          )}
        />
      </Box>
      <Text pt="2%" mb="1%" mt={{ base: "5%", md: "3%" }}>
        Badges:
      </Text>
      <Box
        mb={{ base: "10%", md: "0%" }}
        p="5%"
        pt="2%"
        pb="2%"
        justifyContent="end"
        boxShadow="base"
        rounded="lg"
        borderRadius="lg"
      >
        <CommunitiesBox router={router} communities={communities} />
      </Box>
      {user.about && (
        <>
          <Text pt="2%" mb="1%" mt={{ base: "10%", md: "3%" }}>
            Sobre:
          </Text>
          <Box
            mb={{ base: "10%", md: "0%" }}
            p="5%"
            pt="2%"
            pb="2%"
            justifyContent="end"
            boxShadow="base"
            rounded="lg"
            borderRadius="lg"
          >
            <Text textAlign="justify" fontSize={{ base: "sm", md: "md" }}>
              {user.about}
            </Text>
          </Box>
        </>
      )}
      <Flex
        mt="4%"
        mr="2%"
        ml="2%"
        alignItems={{ base: "center", md: "start" }}
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="center"
      >
        {(user.contact?.title || user.contact?.link) && (
          <Button
            colorScheme="blue"
            size="lg"
            mr={{ md: "2%" }}
            mb={{ base: "4%", md: "0%" }}
            onClick={
              user.contact?.link
                ? () => window.open(`${user.contact?.link}`, "_blank")
                : undefined
            }
          >
            {user.contact?.title ? user.contact?.title : user.contact?.link}
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

interface CommunitiesBoxProps {
  communities: Community[];
  router: NextRouter;
}

const CommunitiesBox = ({ communities, router }: CommunitiesBoxProps) => {
  return (
    <Flex>
      {communities.map((community: Community, index: number) => (
        <Avatar
          size="lg"
          boxShadow="base"
          mr="2%"
          cursor="pointer"
          key={index}
          name={community.name}
          src={community.photoURL as string}
          onClick={() => router.push(`/community/${community.slug}`)}
        />
      ))}
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;
  const user = await getUserByUsername(id as string);
  const communities = await getFollowedCommunities(id as string);

  return {
    props: {
      user,
      communities,
    },
  };
};

export default UserPage;
