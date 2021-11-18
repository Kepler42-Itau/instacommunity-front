import type { NextPage } from "next";
import React, { useState } from "react";
import Head from "next/head";
import { Button, ButtonGroup, Heading, Center, Link } from "@chakra-ui/react";
import {
  ArrowForwardIcon,
  ExternalLinkIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import { HStack, Input } from "@chakra-ui/react";
import { List, ListItem } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";

const Home: NextPage = () => {
  const userId = 1;
  const router = useRouter();
  const toast = useToast();

  const [name, setName] = React.useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value);
  const [list, setList] = React.useState([]);

  const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    if (trimmedName === "") return;
    const search = new URLSearchParams({ name: trimmedName });
    fetch(`http://localhost:8080/communities?${search}`, {
      method: "GET",
      headers: [["Content-Type", "application/json"]],
    })
      .then((res) => res.json())
      .then((data) => {
        console.log({ data });
        if (data.length == 0) {
          toast({
            title: "Nenhum resultado encontrado",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        } else {
          setList(data);
        }
      });
  };

  return (
    <div>
      <Head>
        <title>Instacommunity</title>
      </Head>
      {/* <Center>
        <Button
          rightIcon={<ArrowForwardIcon />}
          colorScheme="blue"
          onClick={() => router.push("/register")}
        >
          Register
        </Button>
      </Center> */}
      <form onSubmit={handleSubmit}>
        <Center h="100px">
          <HStack spacing="24px">
            <Input
              placeholder="Ex: Kotlin"
              width="300px"
              size="sm"
              value={name}
              onChange={handleChange}
            />
            <Button
              rightIcon={<SearchIcon />}
              colorScheme="blue"
              type="submit"
              onClick={handleSubmit}
            >
              Buscar
            </Button>
            <Button
              rightIcon={<ArrowForwardIcon />}
              colorScheme="blue"
              onClick={() => router.push("/communities/create")}
            >
              Criar Comunidade
            </Button>
          </HStack>
        </Center>
      </form>
      <Center>
        {
          <List>
            {" "}
            {list.map((community: any, index: any) => {
              return (
                <ListItem
                  key={community.id}
                  onClick={() => router.push(`/communities/${community.id}`)}
                >
                  {community.name} - {community.description}
                </ListItem>
              );
            })}
          </List>
        }
      </Center>
    </div>
  );
};

export default Home;
