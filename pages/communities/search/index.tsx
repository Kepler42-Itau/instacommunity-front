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
  Image,
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
import api from "../../../services/api";
import Community from "../../../models/Community";

const Search: NextPage = () => {
  const router = useRouter();
  const toast = useToast();
  const [name, setName] = React.useState("");
  const [list, setList] = React.useState<Community[]>([]);
  const [isValid, setIsValid] = React.useState(true);

  useEffect(() => {
    if (!router.isReady) return;

    const searchTerm = router.query.searchTerm?.toString() || "";
    requestSearch(searchTerm);
  }, [router.isReady]);

  function requestSearch(searchTerm: string) {
    const trimmedName = searchTerm.trim();

    // if (trimmedName === "") {
    //   setIsValid(false);
    //   setList([]);
    //   return;
    // }
    setIsValid(true);
    const search = new URLSearchParams({ name: trimmedName });

    api.searchCommunity(trimmedName).then((data) => {
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
      <NavBar
        searchFunction={(searchTerm: string) => requestSearch(searchTerm)}
      />
      <CommunityList list={list} />
    </Box>
  );
};

export default Search;
