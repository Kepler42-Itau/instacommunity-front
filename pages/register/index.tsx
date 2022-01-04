import type { NextPage } from "next";
import React, { useState, useContext  } from "react";
import Head from "next/head";
import { useRouter, } from "next/router";
import { Button, Input, Flex, Center, useToast } from "@chakra-ui/react";
import api from "../../services/api"
import { loginWithGoogle, logoutFromGoogle } from "../../services/firebase"
import { UserContext } from "../../lib/UserContext"

const Register: NextPage = () => {
  const [name, setName] = React.useState("");
  const router = useRouter();
  const toast = useToast();
  const {user, userBackend} = useContext(UserContext);

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
    <>
      <Head>
        <title>Instacommunity</title>
      </Head>
        <Center>
          <Flex>
            { !user && <Button onClick={() => loginWithGoogle()}>Login With Google</Button>}
            { user && <Button onClick={() => logoutFromGoogle()}>Logout</Button>}
          </Flex>
        </Center>
    </>
  );
};

export default Register;
