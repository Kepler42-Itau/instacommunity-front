import type { NextPage } from "next";
import React, { useState } from "react";
import Head from "next/head";

import { useRouter } from "next/router";

import {
  Button,
  ButtonGroup,
  Input,
  VStack,
  Center,
  FormControl,
  FormLabel,
  Textarea,
  useToast,
  Text,
} from "@chakra-ui/react";
import { LinkIcon, TriangleUpIcon } from "@chakra-ui/icons";
import NavBar from "../../../components/NavBar";
import Community from "../../../models/Community";
import ErrorResponse from "../../../models/ErrorResponse";

const Create: NextPage = () => {
  const [name, setName] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const toast = useToast();
  const router = useRouter();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value);

  const handleContactChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setContact(event.target.value);

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
    setIsLoading(true);
    fetch("http://localhost:8080/communities", {
      method: "POST",
      headers: [["Content-Type", "application/json"]],
      body: JSON.stringify({
        name: trimmedName,
        description: trimmedDescription,
        contact,
      }),
    })
      .then((res) => res.json())
      .then((res: Community) => handleResponse(res));
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
            <FormControl id="contato">
              <FormLabel>Contato</FormLabel>
              <Input
                placeholder="ex: https://aka.ms/COBOL"
                width="300px"
                size="sm"
                value={contact}
                onChange={handleContactChange}
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
              Criar Comunidade
            </Button>
          </VStack>
        </Center>
      </form>
    </div>
  );
};

export default Create;
