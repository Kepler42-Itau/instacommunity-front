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
  Textarea,
  useToast,
  Text,
} from "@chakra-ui/react";
import { LinkIcon, TriangleUpIcon } from "@chakra-ui/icons";

const Create: NextPage = () => {
  const [name, setName] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [description, setDescription] = React.useState("");
  const toast = useToast();
  const router = useRouter();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value);
  const handleContactChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setContact(event.target.value);
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => setDescription(event.target.value);

  const handleToast = (ret: String) => {
    if (ret)
      toast({
        title: "Este nome já existe",
        description: "A comunidade não pôde ser criada.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    else
      toast({
        title: "Comunidade criada!",
        description: "A comunidade foi criada com êxito.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
  };

  const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    let trimmedName = name.trim();
    let trimmedDescription = description.trim();

    if (trimmedName.length < 1 || trimmedName.length > 200)
      return alert("Invalid Name");

    if (trimmedDescription.length < 2 || trimmedDescription.length > 300)
      return alert("Invalid Description");

    fetch("http://localhost:8080/communities", {
      method: "POST",
      headers: [["Content-Type", "application/json"]],
      body: JSON.stringify({
        name: trimmedName,
        description: trimmedDescription,
        contact
      }),
    })
      .then((res) => res.json())
      .then((res) => handleToast(res.error));
  };

  return (
    <div>
      <Head>
        <title>Criar Comunidade</title>
      </Head>
      <Button
        rightIcon={<TriangleUpIcon />}
        colorScheme="blue"
        onClick={() => router.push(`/`)}
      >
        Home
      </Button>
      <form onSubmit={handleSubmit}>
        <Center h="324px">
          <VStack spacing="24px">
            <>
              <Text mb="8px">Nome</Text>
              <Input
                placeholder="Ex: Amigos do Cobol"
                width="300px"
                size="sm"
                value={name}
                onChange={handleNameChange}
              />
              <Text mb="8px">Contato</Text>
              <Input
                placeholder="Ex: https://canalTelegram.com"
                width="300px"
                size="sm"
                value={contact}
                onChange={handleContactChange}
              />
            </>
            <>
              <Text mb="8px">Descrição</Text>
              <Textarea
                placeholder="Ex: Amigos desde 1876"
                width="300px"
                size="sm"
                value={description}
                onChange={handleDescriptionChange}
              />
            </>
            <Button colorScheme="blue" type="submit">
              Criar Comunidade
            </Button>
          </VStack>
        </Center>
      </form>
    </div>
  );
};

export default Create;
