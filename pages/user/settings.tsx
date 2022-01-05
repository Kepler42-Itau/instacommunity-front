import type { NextPage } from "next";
import Head from "next/head";
import { UserContext } from "../../lib/UserContext"
import React, {useContext, useState} from "react";
import NavBar from "../../components/NavBar";
import {Input, Box, Flex, VStack, Center, FormLabel, FormControl, Avatar, Text, Badge, Switch} from "@chakra-ui/react";

const Settings: NextPage  = () => {
  const {user, userBackend} = useContext(UserContext)
  // @ts-ignore
  return (
    (!userBackend ? <FirstLogin user={user}/> : <ChangeInfo />)
  );
};

function FirstLogin({ user }: any) {
  const [nickname, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobPost, setJobPost] = useState("");
  const [usePhoto, setUsePhoto] = useState(false);

  const handleJobPostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJobPost(e.target.value)
  }
  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value)
  }
  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value)
  }
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     setName(e.target.value)
  }
  const handlePhotoChange = (e: any) => {
    setUsePhoto(!usePhoto);
  }
  const handleSubmit = () => {

  }

  return (<>
  <Head>
    <title>Criar Usuário</title>
  </Head>
    <NavBar/>
      <Flex>
        <Center mt="3%" width="100%">
            <VStack spacing="13px" width="40%">
              <Flex borderRadius="md" pt={2} pb={2} p={6} boxShadow="base">
                <Flex mb="3%" >
                  { !usePhoto && <Avatar size='lg' src={user.photoURL} />}
                  { usePhoto && <Avatar size='lg' name={`${firstName} ${lastName}`} />}
                <Box ml='3'>
                  <Text fontWeight='bold'>
                    {nickname}
                    <Badge ml='1' colorScheme='green'>
                       PREVIEW
                    </Badge>
                  </Text>
                  <Text fontSize='sm'>{jobPost}</Text>
                </Box>
              </Flex>
              </Flex>

              {/*<form onSubmit={handleSubmit} width="100%">*/}

              <FormControl id="First name" isRequired>
                <FormLabel>Nome</FormLabel>
                <Input
                  placeholder="Nome"
                  value={firstName}
                  width="100%"
                  onChange={handleFirstNameChange}
                />
              </FormControl>
                <FormControl id="Last name" isRequired>
                  <FormLabel>Sobrenome</FormLabel>
                  <Input
                    placeholder="Sobrenome"
                    value={lastName}
                    width="100%"
                    onChange={handleLastNameChange}
                  />
                </FormControl>
                <FormControl id="nickname" isRequired>
                <FormLabel>Apelido</FormLabel>
                <Input
                  placeholder="Apelido"
                  value={nickname}
                  width="100%"
                  onChange={handleNicknameChange}
                />
                </FormControl>
                <FormControl id="jobpost" isRequired>
                <FormLabel>Cargo</FormLabel>
                <Input
                  placeholder="Cargo"
                  value={jobPost}
                  width="100%"
                  onChange={handleJobPostChange}
                />
                </FormControl>
              <FormControl>
                <FormLabel>
                  Usar a foto do Google?
                </FormLabel>
                <Switch id="photo" onChange={handlePhotoChange} />
              </FormControl>
              {/*</form>*/}
            </VStack>
        </Center>
      </Flex>
  </>);
}

function ChangeInfo() {
  return (<></>);
}

function SettingsForm() {
  return (<></>);
}

export default Settings;
