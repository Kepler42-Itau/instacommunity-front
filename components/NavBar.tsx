import {
  Box,
  Button,
  Center,
  Flex,
  Spacer,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  InputRightAddon,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

import { SearchIcon } from "@chakra-ui/icons";

interface NavBarProps {
  profile: Boolean;
  home: Boolean;
  searchFunction?: Function;
}

export default function NavBar({
  profile = false,
  home = false,
  searchFunction = undefined,
}: NavBarProps) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(event.target.value);

  const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    if (searchFunction) {
      searchFunction(searchTerm);
    } else {
      router.push({
        pathname: `/communities/search`,
        query: {
          searchTerm: searchTerm,
        },
      });
    }
  };

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
        <form
          onSubmit={handleSubmit}
          style={{ width: "100%", marginLeft: "5%" }}
        >
          <Center>
            <InputGroup width="40%" size="md">
              <Input
                placeholder="Buscar comunidade"
                size="md"
                value={searchTerm}
                onChange={handleChange}
                borderRadius="md"
              />
              <InputRightElement
                children={
                  <Button type="submit" size="md">
                    <SearchIcon />
                  </Button>
                }
              />
            </InputGroup>
          </Center>
        </form>
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
