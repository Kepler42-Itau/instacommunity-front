import type { NextPage } from "next";
import { useEffect, useState, useContext } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {UserContext} from "../../lib/UserContext"
import {
  Button,
  Input,
  VStack,
  Center,
  Flex,
  Text,
  InputLeftAddon,
  Box,
  FormControl,
  FormLabel,
  Textarea,
  useToast,
  InputGroup,
} from "@chakra-ui/react";
import NavBar from "../../components/NavBar";
import Community from "../../models/Community";
import ErrorResponse from "../../models/ErrorResponse";
import api from "../../services/api";

const Create: NextPage = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [contact2, setContact2] = useState("");
  const [contact3, setContact3] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const {user, userBackend} = useContext(UserContext);
  const [disabled, setDisabled] = useState(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setName(event.target.value);

  const handleContactChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setContact(event.target.value);

  const handleContact2Change = (event: React.ChangeEvent<HTMLInputElement>) =>
    setContact2(event.target.value);

  const handleContact3Change = (event: React.ChangeEvent<HTMLInputElement>) =>
    setContact3(event.target.value);

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => setDescription(event.target.value);

  const handleResponse = (res: Community | ErrorResponse) => {
    if ("error" in res) {
      toast({
        title: "Este nome já existe",
        description: "A comunidade não pôde ser criada.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      setIsLoading(false);
    } else {
      router.push(`/communities/${res.id}`);
    }
  };

  useEffect(() => {
    if (userBackend == null) {
      setDisabled(true);
    }
  }, [userBackend])

  const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    let trimmedName = name.trim();
    let trimmedDescription = description.trim();
    let trimmedContact = contact.trim();
    let trimmedContact2 = contact.trim();
    let trimmedContact3 = contact.trim();

    if (trimmedName.length < 1 || trimmedName.length > 400)
      return toast({
        title: "Nome inválido",
        description: "O nome da comunidade deve ter entre 1 e 400 caracteres.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });

    if (trimmedContact.length < 1) {
      return toast({
        title: "Adicione um canal de comunicação!",
        description: "Um canal é necessário para a criação de sua comunidade.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else if (trimmedContact.length > 300) {
      return toast({
        title: "Canal de comunição inválido",
        description:
          "O link do canal de comunicação deve ter entre 1 e 400 caracteres.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }

    if (trimmedContact2 != "" && trimmedContact2.length > 300) {
      return toast({
        title: "Canal de comunição II inválido",
        description:
          "O link do canal de comunicação deve ter entre 1 e 400 caracteres.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }

    if (trimmedContact3 != "" && trimmedContact3.length > 300) {
      return toast({
        title: "Canal de comunição II inválido",
        description:
          "O link do canal de comunicação deve ter entre 1 e 400 caracteres.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }

    if (trimmedDescription.length < 1) {
      return toast({
        title: "Adicione uma descrição!",
        description:
          "Uma descrição é necessária para a criação de sua comunidade.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else if (trimmedDescription.length > 300) {
      return toast({
        title: "Descrição inválida",
        description:
          "A descrição da comunidade deve ter entre 1 e 300 caracteres.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }

    if (trimmedContact != "" && !trimmedContact.match(/^https?:\/\//gi)) {
      trimmedContact = "http://" + trimmedContact;
    }
    if (trimmedContact2 != "" && !trimmedContact2.match(/^https?:\/\//gi)) {
      trimmedContact2 = "http://" + trimmedContact2;
    }
    if (trimmedContact3 != "" && !trimmedContact3.match(/^https?:\/\//gi)) {
      trimmedContact3 = "http://" + trimmedContact3;
    }

    setIsLoading(true);
    const community: Community = {
      name: trimmedName,
      description: trimmedDescription,
      contact: trimmedContact,
      contact2: trimmedContact2,
      contact3: trimmedContact3,
      creator: userBackend.id
    };
    api.createCommunity(community).then(handleResponse);
  };

  return (
    <Box>
      <Head>
        <title>Criar Comunidade</title>
      </Head>
      <NavBar />
      <Flex>
        <Center mt="3%" width="100%">
          <VStack spacing="24px" width="40%">
            <FormControl id="nome" isRequired>
              <FormLabel>Nome</FormLabel>
              <Input
                placeholder="ex: Amigos do Cobol"
                width="100%"
                value={name}
                onChange={handleNameChange}
              />
            </FormControl>
            <FormControl id="contato" isRequired>
              <FormLabel>Canal de comunicação I</FormLabel>
              <InputGroup>
                <InputLeftAddon>
                  <Text>{"https://"}</Text>
                </InputLeftAddon>
                <Input
                  placeholder="ex: aka.ms/COBOL"
                  width="100%"
                  value={contact}
                  onChange={handleContactChange}
                />
              </InputGroup>
            </FormControl>
            <FormControl id="contato2">
              <FormLabel>Canal de comunicação II</FormLabel>
              <InputGroup>
                <InputLeftAddon>
                  <Text>{"https://"}</Text>
                </InputLeftAddon>
                <Input
                  placeholder="Opcional"
                  width="100%"
                  value={contact2}
                  onChange={handleContact2Change}
                />
              </InputGroup>
            </FormControl>
            <FormControl id="contato3">
              <FormLabel>Canal de comunicação III</FormLabel>
              <InputGroup>
                <InputLeftAddon>
                  <Text>{"https://"}</Text>
                </InputLeftAddon>
                <Input
                  placeholder="Opcional"
                  width="100%"
                  value={contact3}
                  onChange={handleContact3Change}
                />
              </InputGroup>
            </FormControl>
            <FormControl id="descricao" isRequired>
              <FormLabel>Descrição</FormLabel>
              <Textarea
                placeholder="ex: Amigos desde 1876"
                width="100%"
                value={description}
                onChange={handleDescriptionChange}
              />
            </FormControl>
            <Center flexDirection="row" width="100%">
              <Button
                colorScheme="red"
                mr="5%"
                variant="outline"
                onClick={() => router.push("/")}
              >
                Cancelar
              </Button>{" "}
              <Button
                colorScheme="blue"
                type="submit"
                isLoading={isLoading}
                isDisabled={disabled}
                loadingText="Criando Comunidade"
                onClick={handleSubmit}
              >
                Enviar
              </Button>
            </Center>
          </VStack>
        </Center>
      </Flex>
    </Box>
  );
};

export default Create;
