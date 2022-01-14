import { useDisclosure } from "@chakra-ui/hooks";
import { useRef } from "react";
import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  IconButton,
  FormControl,
  FormLabel,
  ModalBody,
  ModalFooter,
  Input,
  useToast, Textarea,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import api from '../services/api'
import Community from "../models/Community";
import ErrorResponse from "../models/ErrorResponse";

export default function SettingsModal(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [contact, setContact] = useState(props.contacts[0]);
  const [contact2, setContact2] = useState(props.contacts[1]);
  const [contact3, setContact3] = useState(props.contacts[2]);
  const [description, setDescription] = useState(props.community.description);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setContact(event.target.value);
  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) =>
    setContact2(event.target.value);
  const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) =>
    setContact3(event.target.value);
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setDescription(event.target.value);

  const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    let trimmedContact = contact.trim();
    let trimmedContact2 = contact2.trim();
    let trimmedContact3 = contact3.trim();
    let trimmedDescription = description.trim();

    if (!trimmedContact.match(/^https?:\/\//gi)) {
      trimmedContact = "http://" + trimmedContact;
    }
    if (trimmedContact2 != "" && !trimmedContact2.match(/^https?:\/\//gi)) {
      trimmedContact2 = "http://" + trimmedContact2;
    }
    if (trimmedContact3 != "" && !trimmedContact3.match(/^https?:\/\//gi)) {
      trimmedContact3 = "http://" + trimmedContact3;
    }

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
    if (trimmedDescription.length < 1)
      return toast({
        title: "Adicione uma descrição!",
        description:
          "Uma descrição é necessária para a criação de sua comunidade.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });

    setIsLoading(true);

    const handleResponse = (res: Community | ErrorResponse) => {
      if ("error" in res) {
        toast({
          title: "Este nome já existe",
          description: "A comunidade não pôde ser editada.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        setIsLoading(false);
      }
      toast({
        title: "Atualizado",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      onClose();
      setIsLoading(false);
    };

    console.log({ trimmedContact, trimmedContact2, trimmedContact3 });
    api.updateCommunity({
      description: trimmedDescription,
      contact: trimmedContact,
      contact2: trimmedContact2,
      contact3: trimmedContact3,
    }, props.id).then(handleResponse);
  };

  return (
    <>
      <IconButton aria-label='Configurações da comunidade' colorScheme="blue" size="lg" onClick={onOpen} icon={<EditIcon />} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Configurações da Comunidade</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl id="Contato" isRequired>
              <FormLabel>Contato</FormLabel>
              <Input
                placeholder="ex: https://aka.ms/COBOL"
                size="sm"
                value={contact}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mt="3%" id="Contato2">
              <FormLabel>Contato 2</FormLabel>
              <Input
                placeholder="opcional"
                size="sm"
                value={contact2}
                onChange={handleChange2}
              />
            </FormControl>
            <FormControl mt="3%" id="Contato3">
              <FormLabel>Contato 3</FormLabel>
              <Input
                placeholder="opcional"
                size="sm"
                value={contact3}
                onChange={handleChange3}
              />
            </FormControl>
            <FormControl mt="3%" id="descricao" isRequired>
              <FormLabel>Descrição</FormLabel>
              <Textarea
                placeholder="ex: Amigos desde 1876"
                width="100%"
                value={description}
                onChange={handleDescriptionChange}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              isLoading={isLoading}
              mr={3}
              onClick={handleSubmit}
            >
              Salvar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
