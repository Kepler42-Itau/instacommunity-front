import type { NextPage } from "next";
import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Button, Input, Flex, Center, useToast } from "@chakra-ui/react";
import api from "../../services/api"

const Register: NextPage = () => {
  const [name, setName] = React.useState("");
  const router = useRouter();
  const toast = useToast();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value);

  const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    let trimmedName = name.trim();

    if (trimmedName.length < 2 || trimmedName.length > 200)
      return toast({
        title: "Nome inválido",
        status: "error",
        duration: 9000,
        isClosable: true,
      });

    api.createNewUser(trimmedName).then((res) => {
      let title, status: "success" | "error";
      if (res) {
        title = "Usuário criado com sucesso!";
        status = "success";
      } else {
        title = "Erro ao criar usuário";
        status = "error";
      }
      toast({
        title,
        status,
        duration: 9000,
        isClosable: true,
      });
    });
  };

  return (
    <div>
      <Head>
        <title>Instacommunity</title>
      </Head>
      <form onSubmit={handleSubmit}>
        <Center h="100px" p="4%">
          <Flex>
            <Input
              placeholder="Ex: Fausto Silva"
              size="md"
              borderRadius="md"
              value={name}
              onChange={handleChange}
              mr="2%"
            />
            <Button colorScheme="blue" type="submit">
              Cadastrar
            </Button>
          </Flex>
        </Center>
      </form>
    </div>
  );
};

export default Register;
