import type { NextPage } from "next";
import React, { useEffect } from "react";
import {
  Avatar,
  Button,
  Box,
  Flex,
  Spacer,
  Center,
  Input,
  List,
  ListItem,
  VStack,
  useToast,
  Text,
} from "@chakra-ui/react";
import { SearchIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import NavBar from "../../../components/NavBar";

const Search: NextPage = () => {
  const router = useRouter();
  const toast = useToast();
  const [name, setName] = React.useState("");
  const [list, setList] = React.useState([]);
  const [isValid, setIsValid] = React.useState(true);

  useEffect(() => {
    if (router.query.searchTerm) {
      // fazer a busca já
      const searchTerm = router.query.searchTerm.toString();
      requestSearch(searchTerm);
    }
  }, [])

  function requestSearch(searchTerm: String) {
    const trimmedName = searchTerm.trim();

    if (trimmedName === "") {
      setIsValid(false);
      setList([]);
      return;
    }
    setIsValid(true);
    const search = new URLSearchParams({ name: trimmedName });

    fetch(`http://localhost:8080/communities?${search}`, {
      method: "GET",
      headers: [["Content-Type", "application/json"]],
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.length == 0) {
          toast({
            title: "Nenhum resultado encontrado",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
          setList([]);
        } else {
          setList(data);
        }
      });
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value);

  const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    requestSearch(name);
  };

  return (
    <Box>
      <NavBar profile={false} home={true} searchFunction={(searchTerm: String) => requestSearch(searchTerm)} />
      <form onSubmit={handleSubmit}>
        <Center h="100px">
          <Flex>
            <Input
              placeholder="Ex: Kotlin"
              size="xm"
              value={name}
              onChange={handleChange}
              mr="2%"
              pl="2%"
              borderRadius="md"
              isInvalid={!isValid}
            />
            <Spacer />
            <Button
              rightIcon={<SearchIcon />}
              colorScheme="blue"
              type="submit"
            >
              Buscar
            </Button>
          </Flex>
        </Center>
      </form>
      <Center>
        {
          <List w="40%">
            {list.map((community: any, index: any) => {
              return (
                <ListItem
                  key={community.id}
                  onClick={() => router.push(`/communities/${community.id}`)}
                  cursor="pointer"
                  w="100%"
                >
                  <Flex
                    border="1px"
                    borderColor="gray.600"
                    borderRadius="md"
                    m="3%"
                  >
                    <Avatar name={community.name} size="md" m="4%" />
                    <Box ml="0%" m="4%">
                      <Text fontSize="md">{community.name}</Text>
                      <Text fontSize="xs">{community.description}</Text>
                    </Box>
                  </Flex>
                </ListItem>
              );
            })}
          </List>
        }
      </Center>
    </Box>
  );
};

export default Search;
