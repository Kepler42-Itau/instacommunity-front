import type { NextPage } from "next";
import Head from "next/head";
import { UserContext } from "../../lib/UserContext"
import React, {useContext, useState} from "react";
import NavBar from "../../components/NavBar";
import {Input, Box, Flex, VStack, Center, FormLabel, FormControl, Avatar, Text, Badge, Switch, ButtonGroup, Button} from "@chakra-ui/react";
import User from "../../models/User"
import api from "../../services/api";
import login from "../login";
import {loginWithGoogle} from "../../services/firebase";

const Settings: NextPage  = () => {
  const {user, userBackend} = useContext(UserContext)
  // @ts-ignore
  return <SettingsForm user={user} userBackend={userBackend} />
};

function SettingsForm({ user, userBackend }: any) {
  const [nickName, setName] = useState(userBackend?.nickName || "");
  const [firstName, setFirstName] = useState(userBackend?.firstName || "");
  const [lastName, setLastName] = useState(userBackend?.lastName || "");
  const [jobPost, setJobPost] = useState(userBackend?.jobPost || "");
  const [usePhoto, setUsePhoto] = useState(userBackend?.usePhoto || false);

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
    const definedUser: User = {
      id: 0,
      googleId: user.uid,
      firstName: firstName,
      lastName: lastName,
      nickName: nickName,
      jobPost: jobPost,
      usePhoto: usePhoto,
      email : user.email,
    }
    api.createNewUser(definedUser);
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
              { !usePhoto && <Avatar size='lg' src={user?.photoURL } />}
              { usePhoto && <Avatar size='lg' name={`${firstName} ${lastName}`} />}
              <Box ml='3'>
                <Text fontWeight='bold'>
                  {nickName}
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
              value={nickName}
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
            <Switch id="photo" defaultChecked={true} onChange={handlePhotoChange} />
          </FormControl>
          <ButtonGroup spacing='10'>
            <Button colorScheme='red' variant='outline' >Cancelar</Button>
            <Button colorScheme='blue' variant='solid' onClick={handleSubmit}>Salvar</Button>
          </ButtonGroup>
          {/*</form>*/}
        </VStack>
      </Center>
    </Flex>
  </>);
}

export default Settings;
