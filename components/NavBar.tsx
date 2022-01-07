import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  Text,
  InputGroup,
  useColorModeValue,
  Avatar,
  InputRightElement,
  useColorMode,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useContext } from "react";
import { SearchIcon, MoonIcon, SunIcon, AddIcon } from "@chakra-ui/icons";
import {UserContext} from "../lib/UserContext";

interface NavBarProps {
  searchFunction?: Function;
}

export default function NavBar({ searchFunction = undefined }: NavBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('white', 'gray.800');
  const { user, userBackend } = useContext(UserContext);
  console.log({user, userBackend});

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
      <Flex p="1%" justifyContent="center" w="100%" bg={bg}>
        <Flex flex="1" justifyContent="start" ml="auto">
          <Text
            bgGradient="linear(to-r, #FF7900, #9D4EDD)"
            bgClip="text"
            height="100%"
            fontSize="3xl"
            fontWeight="extrabold"
            userSelect="none"
            cursor="pointer"
            _hover={{
              bgGradient: "linear(to-r, #ff6d00, #7B2CBF)",
            }}
            _active={{
              transform: "scale(0.98)",
            }}
            transition="all 0.2s ease-in-out"
            onClick={() => router.push("/")}
          >
            InstaCommunity
          </Text>
        </Flex>
        <Center flex="5" justifyContent="center" alignSelf="center">
          <form
            style={{ width: "50%", margin: "0 auto" }}
            onSubmit={handleSubmit}
          >
            <InputGroup width="100%" size="md">
              <Input
                placeholder="Buscar comunidade"
                size="md"
                value={searchTerm}
                onChange={handleChange}
                borderRadius="md"
                border="1px"
              />
              <InputRightElement>
                <Button type="submit" size="md">
                  <SearchIcon />
                </Button>
              </InputRightElement>
            </InputGroup>
          </form>
        </Center>
        <Flex flex="1" justifyContent="end" mr="auto">
          <Center mr="1%">
            <Button onClick={() => toggleColorMode()} width="100%">
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
          </Center>
          <Center mr="5%">
            <Button
              colorScheme="orange"
              onClick={() => router.push("/communities/create")}
              pd="5%"
              width="100%"
            >
              Criar Comunidade
            </Button>
          </Center>
          {userBackend && user && userBackend.usePhoto &&
            <Avatar
              name={userBackend?.name}
              size="md"
              cursor="pointer"
              src={user.photoURL}
              userSelect="none"
              onClick={() => router.push(`/user/${userBackend.id}`)}
            />}
          {userBackend && user && !userBackend.usePhoto &&
            <Avatar
              name={userBackend?.name}
              size="md"
              cursor="pointer"
              userSelect="none"
              onClick={() => router.push(`/user/${userBackend.id}`)}
            />}
        </Flex>
      </Flex>
    </Box>
  );
}
