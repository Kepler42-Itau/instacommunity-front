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
import CommunityList from "../../../components/CommunityList";

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
      <CommunityList list={list} />
    </Box>
  );
};

export default Search;
