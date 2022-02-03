import { useDisclosure } from "@chakra-ui/hooks";
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
  useToast,
  Textarea,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import Community from "../models/Community";
import ErrorResponse from "../models/ErrorResponse";
import Contact from "../models/Contact";
import { updateCommunity, updateContact } from "../lib/Api";


interface SettingsProps {
  contacts: Contact[],
  community: Community
}

export default function SettingsModal(props: SettingsProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [contact, setContact] = useState(props.contacts[0]);
  const [contact2, setContact2] = useState(props.contacts[1]);
  const [contact3, setContact3] = useState(props.contacts[2]);
  const [description, setDescription] = useState(props.community.description);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setContact(old => ({
        ...old,
        title: event.target.value,
    }))
  const handleTitleChange2 = (event: React.ChangeEvent<HTMLInputElement>) =>
    setContact2(old => ({
        ...old,
        title: event.target.value,
    }))
  const handleTitleChange3 = (event: React.ChangeEvent<HTMLInputElement>) =>
    setContact3(old => ({
        ...old,
        title: event.target.value,
    }))
  const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setContact(old => ({
        ...old,
        link: event.target.value,
    }))
  const handleLinkChange2 = (event: React.ChangeEvent<HTMLInputElement>) =>
    setContact2(old => ({
        ...old,
        link: event.target.value,
    }))
  const handleLinkChange3 = (event: React.ChangeEvent<HTMLInputElement>) =>
    setContact3(old => ({
        ...old,
        link: event.target.value,
    }))

  const handleDescriptionChange = ( event: React.ChangeEvent<HTMLTextAreaElement>) =>
      setDescription(event.target.value);

  const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    let trimmedContact = contact.link?.trim() || "";
    let trimmedContact2 = contact2.link?.trim() || "";
    let trimmedContact3 = contact3.link?.trim() || "";
    let trimmedDescription = description.trim();

    if (trimmedContact != "" && !trimmedContact.match(/^https?:\/\//gi)) {
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
          title: "Erro",
          description: "Contate um administrador",
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

    if (description != props.community.description) {
        const community = {
            ...props.community,
            description: description,
        }
        updateCommunity(community, props.community.id as number)
            .then(handleResponse);
    }

    if (
        trimmedContact != props.contacts[0].link ||
        contact.title != props.contacts[0].title
    ) {
        const newContact: Contact = {
            id: props.contacts[0].id,
            title: contact.title,
            link: trimmedContact,
        }
        updateContact(props.community.id as number, newContact)
            .then(handleResponse);
    }

    if (
        trimmedContact2 != props.contacts[1].link ||
        contact2.title != props.contacts[1].title
    ) {
        const newContact: Contact = {
            id: props.contacts[1].id,
            title: contact2.title,
            link: trimmedContact2,
        }
        updateContact(props.community.id as number, newContact)
            .then(handleResponse);
    }


    if (
        trimmedContact3 != props.contacts[2].link ||
        contact3.title != props.contacts[2].title
    ) {
        const newContact: Contact = {
            id: props.contacts[2].id,
            title: contact3.title,
            link: trimmedContact3,
        }
        updateContact(props.community.id as number, newContact)
            .then(handleResponse);
    }

    console.log({ trimmedContact, trimmedContact2, trimmedContact3 });
  };

  return (
    <>
      <IconButton
        aria-label="Configurações da comunidade"
        colorScheme="blue"
        size="lg"
        onClick={onOpen}
        icon={<EditIcon />}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Configurações da Comunidade</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl id="Contato" isRequired>
              <FormLabel>Link</FormLabel>
              <Input
                placeholder="ex: https://aka.ms/COBOL"
                size="sm"
                value={contact.link || ""}
                onChange={handleLinkChange}
              />
              <FormLabel>Título</FormLabel>
              <Input
                placeholder="ex: https://aka.ms/COBOL"
                size="sm"
                value={contact.title}
                onChange={handleTitleChange}
              />
            </FormControl>
            <FormControl mt="3%" id="Contato2">
              <FormLabel>Link</FormLabel>
              <Input
                placeholder="ex: https://aka.ms/COBOL"
                size="sm"
                value={contact2.link || ""}
                onChange={handleLinkChange2}
              />
              <FormLabel>Contato 2</FormLabel>
              <Input
                placeholder="opcional"
                size="sm"
                value={contact2.title}
                onChange={handleTitleChange2}
              />
            </FormControl>
            <FormControl mt="3%" id="Contato3">
              <FormLabel>Link</FormLabel>
              <Input
                placeholder="ex: https://aka.ms/COBOL"
                size="sm"
                value={contact3.link || ""}
                onChange={handleLinkChange3}
              />
              <FormLabel>Contato 3</FormLabel>
              <Input
                placeholder="opcional"
                size="sm"
                value={contact3.title}
                onChange={handleTitleChange3}
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
