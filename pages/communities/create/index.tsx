import type { NextPage } from "next";
import React, { useState } from "react";
import Head from "next/head";

import { useRouter } from "next/router";

import {
  Button,
  Input,
  VStack,
  Center,
  FormControl,
  FormLabel,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { LinkIcon, TriangleUpIcon } from "@chakra-ui/icons";
import NavBar from "../../../components/NavBar";
import Community from "../../../models/Community";
import ErrorResponse from "../../../models/ErrorResponse";

import api from '../../../services/api'

const Create: NextPage = () => {
  const [name, setName] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [contact2, setContact2] = React.useState("");
  const [contact3, setContact3] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const toast = useToast();
  const router = useRouter();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value);

  const handleContactChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setContact(event.target.value);

  const handleContact2Change = (event: React.ChangeEvent<HTMLInputElement>) =>
    setContact2(event.target.value);

  const handleContact3Change = (event: React.ChangeEvent<HTMLInputElement>) =>
    setContact3(event.target.value);

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => setDescription(event.target.value);

  const handleResponse = (res: Community | ErrorResponse) => {
    if ("error" in res) {
      toast({
        title: "Este nome já existe",
        description: "A comunidade não pôde ser criada.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setIsLoading(false);
    } else {
      router.push(`/communities/${res.id}`);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    let trimmedName = name.trim();
    let trimmedDescription = description.trim();
    let trimmedContact = contact.trim();
    let trimmedContact2 = contact.trim();
    let trimmedContact3 = contact.trim();

    if (trimmedName.length < 1 || trimmedName.length > 200)
      return alert("Invalid Name");

    if (trimmedDescription.length < 2 || trimmedDescription.length > 300)
      return toast({
        title: "Adicione uma descrição!",
        description:
          "Uma descrição é necessária para a criação de sua comunidade.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });

    if (trimmedContact.length < 2 || trimmedContact.length > 300)
      return toast({
        title: "Adicione um contato!",
        description:
          "Um contato é necessário para a criação de sua comunidade.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });

    if (trimmedContact.length < 8 || trimmedContact.length > 200) {
      trimmedContact = "http://" + trimmedContact;
    }
    if (trimmedContact2.length < 8 || trimmedContact2.length > 200) {
      trimmedContact2 = "http://" + trimmedContact2;
    }
    if (trimmedContact3.length < 8 || trimmedContact3.length > 200) {
      trimmedContact3 = "http://" + trimmedContact3;
    }

    setIsLoading(true);
    const community: Community = {
      name: trimmedName,
      description: trimmedDescription,
      contact,
      contact2,
      contact3,
    }
    api.createCommunity(community)
      .then(handleResponse);
  };

  return (
    <div>
      <Head>
        <title>Criar Comunidade</title>
      </Head>
      {/* <Button
        rightIcon={<TriangleUpIcon />}
        colorScheme="blue"
        onClick={() => router.push(`/`)}
      >
        Home
      </Button> */}
      <NavBar profile={false} home={true} />
      <form onSubmit={handleSubmit}>
        <Center mt="2%">
          <VStack spacing="24px">
            <FormControl id="nome" isRequired>
              <FormLabel>Nome</FormLabel>
              <Input
                placeholder="ex: Amigos do Cobol"
                width="300px"
                size="sm"
                value={name}
                onChange={handleNameChange}
              />
            </FormControl>
            <FormControl id="contato" isRequired>
              <FormLabel>Contato</FormLabel>
              <Input
                placeholder="ex: https://aka.ms/COBOL"
                width="300px"
                size="sm"
                value={contact}
                onChange={handleContactChange}
              />
            </FormControl>
            <FormControl id="contato2">
              <FormLabel>Contato 2</FormLabel>
              <Input
                placeholder="opcional"
                width="300px"
                size="sm"
                value={contact2}
                onChange={handleContact2Change}
              />
            </FormControl>
            <FormControl id="contato3">
              <FormLabel>Contato 3</FormLabel>
              <Input
                placeholder="opcional"
                width="300px"
                size="sm"
                value={contact3}
                onChange={handleContact3Change}
              />
            </FormControl>
            <FormControl id="descricao" isRequired>
              <FormLabel>Descrição</FormLabel>
              <Textarea
                placeholder="ex: Amigos desde 1876"
                width="300px"
                size="sm"
                value={description}
                onChange={handleDescriptionChange}
              />
            </FormControl>
            <Button
              colorScheme="blue"
              type="submit"
              isLoading={isLoading}
              loadingText="Criando Comunidade"
              variant="outline"
            >
              Enviar
            </Button>
          </VStack>
        </Center>
      </form>
    </div>
  );
};

export default Create;
