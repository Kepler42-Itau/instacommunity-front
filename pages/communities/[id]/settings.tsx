import type { NextPage } from 'next';
import React, { useState } from 'react';
import Head from 'next/head';
import { Button, ButtonGroup, Input, HStack, Center } from "@chakra-ui/react";
import { useRouter } from 'next/router';
import { useToast } from "@chakra-ui/react";

const Settings: NextPage = () => {
  const [name, setName] = React.useState("")
  const toast = useToast()
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)

  const router = useRouter();
  const { id } = router.query;

  const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
      event.preventDefault()
      let trimmedName = name.trim()

      if (trimmedName.length < 2 || trimmedName.length > 200)
        return alert("Invalid Name")

      fetch(`http://localhost:8080/communities/${id}`, {
      	method: 'PATCH',
      	headers: [['Content-Type', 'application/json']],
      	body: JSON.stringify({ contact: trimmedName }),
      })
    }

  return (
    <div>
      <Head>
        <title>Instacommunity</title>
      </Head>
      <form onSubmit={handleSubmit}>
        <Center h="100px">
          <HStack spacing="24px">
            <Input placeholder="Ex: Discord" width="300px" size="sm" value={name} onChange={handleChange} />
            <Button colorScheme="blue" type="submit" onClick={() =>
                toast({
                  title: "Contato adicionado.",
                  description: "O Contato foi adicionado na comunidade.",
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                })
              }>
             Cadastrar
            </Button>
          </HStack>
        </Center>
      </form>
    </div>
  );
};

export default Settings;
