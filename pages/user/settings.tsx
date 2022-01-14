import type { NextPage } from "next";
import Head from "next/head";
import { UserContext } from "../../lib/UserContext"
import React, {useContext, useState, useEffect} from "react";
import NavBar from "../../components/NavBar";
import {
  Input,
  Box,
  Flex,
  VStack,
  Center,
  FormLabel,
  FormControl,
  Avatar,
  Text,
  Badge,
  Switch,
  ButtonGroup,
  Button,
  useToast
} from "@chakra-ui/react";
import User from "../../models/User"
import api from "../../services/api";
import {logoutFromGoogle} from "../../services/firebase";
import {useRouter} from "next/router";
import ErrorResponse from "../../models/ErrorResponse";

const Settings: NextPage  = () => {
  const {user, userBackend} = useContext(UserContext)
  // @ts-ignore
  return <SettingsForm user={user} userBackend={userBackend} />
};

function SettingsForm({ user, userBackend }: any) {
  const [name, setName] = useState(userBackend?.name || "");
  const [username, setUsername] = useState(userBackend?.username || "");
  const [occupation, setOccupation] = useState(userBackend?.occupation || "");
  const [usePhoto, setUsePhoto] = useState(userBackend?.usePhoto || true);
  const [loading, setLoading] = useState(false);
  const [disableUsername, setDisableUsername] = useState(false);

  useEffect(() => {
    if (user !== null) {
      api.getUser(user.uid).then((r) => {
        if ("error" in r) {
          return ;
        }
        else {
          setName(r.name);
          setUsername(r.username);
          setOccupation(r.occupation);
          setUsePhoto(r.usePhoto);
          setDisableUsername(true);
        }
      })
    }
    if (userBackend !== null) {
      setUsePhoto(userBackend.usePhoto);
    }
  }, [user, userBackend])

  const router = useRouter();
  const toast = useToast();

  const handleOccupationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOccupation(e.target.value)
  }
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }
  const handlePhotoChange = (e: any) => {
    setUsePhoto(!usePhoto);
  }
  const handleCancel = () => {
    if (!userBackend) {
      logoutFromGoogle();
      router.push('/login');
      return ;
    }
    router.push(`/user/${userBackend.username}`)
  }

  const handleResponse = (res: User| ErrorResponse) => {
    if ("error" in res) {
      toast({
        title: "Esse username já existe!",
        description: "Seu usuário não pôde ser criado.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setLoading(false);
    } else {
      userBackend = res;
      router.push(`/user/${userBackend.username}`);
    }
  };

  const handleSubmit = () => {
    const definedUser: User = {
      id: user.uid,
      name: name.trim(),
      username: username.trim(),
      occupation: occupation.trim(),
      usePhoto: usePhoto,
      email : user.email,
      photoURL: user.photoURL
    }
    setLoading(true);
    if (userBackend) {
      api.updateUser(definedUser).then(handleResponse);
    } else {
      api.createNewUser(definedUser).then(handleResponse);
    }
  }

  return (<>
    <Head>
      <title>Configurações do Usuário</title>
    </Head>
    <NavBar/>
    <Flex>
      <Center mt="3%" width="100%" flexDirection="column">
          <Flex borderRadius="md" pt={1} pb={1} p={5} boxShadow="base">
            <Flex mb="3%" >
              { usePhoto && <Avatar size='lg' src={user?.photoURL } />}
              { !usePhoto && <Avatar size='lg' name={name.trim()} />}
              <Box ml='3'>
                <Text fontWeight='bold' mt="3%">
                  {name.trim()}
                </Text>
                <Text fontSize='sm'>{username.trim()}</Text>
              </Box>
            </Flex>
          </Flex>
        <VStack spacing="13px" width="40%" mt="2%">
          {/*<form onSubmit={handleSubmit} width="100%">*/}
          <FormControl id="First name" isRequired>
            <FormLabel>Nome</FormLabel>
            <Input
              placeholder="Nome completo"
              value={name}
              width="100%"
              onChange={handleNameChange}
            />
          </FormControl>
          <FormControl id="nickname" isRequired isDisabled={disableUsername}>
            <FormLabel>Login</FormLabel>
            <Input
              placeholder="Login"
              value={username}
              width="100%"
              onChange={handleLoginChange}
            />
          </FormControl>
          <FormControl id="occupation">
            <FormLabel>Ocupação</FormLabel>
            <Input
              placeholder="Ocupação"
              value={occupation}
              width="100%"
              onChange={handleOccupationChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>
              Usar a foto do Google?
            </FormLabel>
            <Switch id="photo" isChecked={usePhoto} defaultChecked={usePhoto} onChange={handlePhotoChange} />
          </FormControl>
          <ButtonGroup spacing='10'>
            <Button colorScheme='red' variant='outline' onClick={handleCancel}>Cancelar</Button>
            <Button colorScheme='blue' variant='solid' onClick={handleSubmit} isLoading={loading}>Salvar</Button>
          </ButtonGroup>
          {/*</form>*/}
        </VStack>
      </Center>
    </Flex>
  </>);
}

export default Settings;
