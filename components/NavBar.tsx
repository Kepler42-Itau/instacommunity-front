import { Box, Center, Button, ButtonGroup, Heading, Link, Flex, Spacer, Input } from '@chakra-ui/react';
import { useRouter } from 'next/router'
import React, { useState } from "react";


export default function NavBar() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(event.target.value)

  return (
    <Box>
      {/* TODO: Profile Button  */}
      <Flex>
        <Input
          placeholder="Buscar comunidade"
          size="sm"
          value={searchTerm}
          onChange={handleChange}
        />
        <Button
          colorScheme="blue"
          type="submit"
          onClick={() => router.push({
            pathname: `/communities/search`,
            query: {
              searchTerm: searchTerm,
            }})}>
          Pesquisar
        </Button>
        <Spacer />
        <Button colorscheme="blue" onClick={() => router.push("/communities/create")}  >
          Criar comunidade
        </Button>
      </Flex>
    </Box>
  );
}
