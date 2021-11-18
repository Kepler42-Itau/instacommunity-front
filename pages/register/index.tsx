import type { NextPage } from "next";
import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Button, ButtonGroup, Input, HStack, Center, useToast} from "@chakra-ui/react";
import { LinkIcon, TriangleUpIcon } from "@chakra-ui/icons";

const Register: NextPage = () => {
  const [name, setName] = React.useState("");
  const router = useRouter();
  const toast = useToast();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value);

  const handleToast = (ret: String) => {
    toast({
      title: "Usuário criado com sucesso!",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    let trimmedName = name.trim();

    if (trimmedName.length < 2 || trimmedName.length > 200)
      return alert("Invalid Name");

    fetch("http://localhost:8080/users", {
      method: "POST",
      headers: [["Content-Type", "application/json"]],
      body: JSON.stringify({ name: trimmedName }),
    })
      .then((res) => res.json())
      .then((res) => handleToast(res.ok));
  };

  return (
    <div>
      <Head>
        <title>Instacommunity</title>
      </Head>
      <Button
        rightIcon={<TriangleUpIcon />}
        colorScheme="blue"
        onClick={() => router.push(`/`)}
      >
        Home
      </Button>
      <form onSubmit={handleSubmit}>
        <Center h="100px">
          <HStack spacing="24px">
            <Input
              placeholder="Fausto Silva"
              width="300px"
              size="sm"
              value={name}
              onChange={handleChange}
            />
            <Button colorScheme="blue" type="submit">
              Cadastrar
            </Button>
          </HStack>
        </Center>
      </form>
    </div>
  );
};

export default Register;
