import { useDisclosure } from "@chakra-ui/hooks";
import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Avatar,
  Box,
  Text,
  FormControl,
  ModalBody,
  ModalFooter,
  Input,
  Flex,
  Container,
  useToast,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import Community from "../models/Community";
import User from "../models/User";
import { useRouter } from "next/router";
import { searchCommunity } from "../lib/Api";

const SearchModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState("");
  const [communitySearchResults, setCommunitySearchResults] = useState<
    Community[] | null
  >(null);
  const [userSearchResults, setUserSearchResults] = useState<User[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(event.target.value);

  const handleSearch = () => {
    setIsLoading(true);
    searchCommunity(searchTerm).then((res) => {
      if ("error" in res) {
        // do something
      } else {
        setCommunitySearchResults(res);
      }
    });
    setIsLoading(false);
  };

  return (
    <>
      <Button
        aria-label="Pesquisa"
        onClick={onOpen}
        mr={{ base: "1%", xl: "3%" }}
      >
        <SearchIcon />
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setCommunitySearchResults(null);
          setUserSearchResults(null);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pesquisa</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Flex flexDirection="row">
              <FormControl id="pesquisa" isRequired>
                <Input size="xl" value={searchTerm} onChange={handleChange} />
              </FormControl>
              <Button size="xl" onClick={handleSearch} isLoading={isLoading}>
                <SearchIcon />
              </Button>
            </Flex>
            <Container maxW="container.xl" width="100%">
              <ResultsModal
                communityList={communitySearchResults}
                userList={userSearchResults}
              />
            </Container>
          </ModalBody>
          <ModalFooter>
            <Button
              onClose={() => {
                onClose();
                setCommunitySearchResults(null);
                setUserSearchResults(null);
              }}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

interface ResultsProps {
  communityList: Community[] | null;
  userList: User[] | null;
}

const ResultsModal = ({ communityList, userList }: ResultsProps) => {
  const router = useRouter();

  return (
    <>
      {communityList ? (
        communityList.map((community: Community, index: number) => (
          <Flex
            key={index}
            borderRadius="md"
            pt={1}
            pb={1}
            p={5}
            cursor="pointer"
            onClick={() => router.push(`/community/${community.slug}`)}
            boxShadow="base"
          >
            <Flex mb="3%">
              <Avatar
                size="lg"
                name={community.name}
                src={community.photoURL as string}
              />
              <Box ml="3">
                <Text fontWeight="bold" mt="3%">
                  {community.name}
                </Text>
              </Box>
            </Flex>
          </Flex>
        ))
      ) : (
        <></>
      )}
      {userList ? (
        userList.map((user: User, index: number) => (
          <Flex
            key={index}
            borderRadius="md"
            pt={1}
            pb={1}
            p={5}
            cursor="pointer"
            onClick={() => router.push(`/user/${user.username}`)}
            boxShadow="base"
          >
            <Flex mb="3%">
              <Avatar
                size="lg"
                name={user.name}
                src={user.photoURL as string}
              />
              <Box ml="3">
                <Text fontWeight="bold" mt="3%">
                  {user.name}
                </Text>
                <Text fontSize="sm">{user.username}</Text>
              </Box>
            </Flex>
          </Flex>
        ))
      ) : (
        <></>
      )}
    </>
  );
};

export default SearchModal;
