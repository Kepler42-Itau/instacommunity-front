import { Box, Button, Flex, Spacer, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Link from "next/link";
import React, { useState } from "react";

interface NavBarProps {
  profile: Boolean;
  home: Boolean;
  searchFunction?: Function;
}

export default function NavBar({ profile = false, home = false, searchFunction = undefined}: NavBarProps) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(event.target.value);

  return (
    <Box>
      <Flex pr="2%" pl="2%" pt="1%">
        {profile && (
          <Button colorScheme="orange" onClick={() => router.push("/user/1")}>
            Perfil
          </Button>
        )}
        {home && (
          <Button colorScheme="orange" onClick={() => router.push("/")}>
            Home
          </Button>
        )}
        <Spacer />
        <Input
          placeholder="Buscar comunidade"
          size="md"
          value={searchTerm}
          onChange={handleChange}
          borderRadius="md"
          w="40%"
          mr="0.5%"
          ml="2%"
        />
        <Button
          colorScheme="blue"
          type="submit"
          mr="2%"
          onClick={() => {
            if (searchFunction) {
              searchFunction(searchTerm)
            } else {
              router.push({
                pathname: `/communities/search`,
                query: {
                  searchTerm: searchTerm,
                },
              });
            }
          }}
        >
          Pesquisar
        </Button>
        <Spacer />
        <Button
          colorScheme="orange"
          onClick={() => router.push("/communities/create")}
          pl="1%"
          pr="1%"
        >
          Criar comunidade
        </Button>
      </Flex>
    </Box>
  );
}
