import { Box, Button, Flex, Spacer, Input } from '@chakra-ui/react';
import { useRouter } from 'next/router'
import React, { useState } from "react";


export default function NavBar() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(event.target.value)

  return (
    <Box>
      <Flex pr="2%" pl="2%" pt="1%">
        <Button colorScheme="orange" onClick={() => router.push("/user/1")} >
          Perfil
        </Button>
        <Spacer />
        <Flex>
        <Input
          placeholder="Buscar comunidade"
          size="md"
          value={searchTerm}
          onChange={handleChange}
          borderRadius="md"
          mr="2%"
        />
        <Button
          colorScheme="blue"
          type="submit"
          onClick={() => router.push({
            pathname: `/communities/search`,
            query: {
              searchTerm: searchTerm,
            }
          })}>
          Pesquisar
        </Button>
        </Flex>
        <Spacer />
        <Button colorScheme="orange" onClick={() => router.push("/communities/create")} >
          Criar comunidade
        </Button>
      </Flex>
    </Box>
  );
}
