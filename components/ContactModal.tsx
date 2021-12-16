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
  useToast,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

export default function ContactModal(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [contact, setContact] = useState(props.contacts[0]);
  const [contact2, setContact2] = useState(props.contacts[1]);
  const [contact3, setContact3] = useState(props.contacts[2]);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setContact(event.target.value);
  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) =>
    setContact2(event.target.value);
  const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) =>
    setContact3(event.target.value);

  const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    let trimmedContact = contact.trim();
    let trimmedContact2 = contact2.trim();
    let trimmedContact3 = contact3.trim();

    if (!trimmedContact.match(/^https?:\/\//gi)) {
      trimmedContact = "http://" + trimmedContact;
    }
    if (trimmedContact2 != "" && !trimmedContact2.match(/^https?:\/\//gi)) {
      trimmedContact2 = "http://" + trimmedContact2;
    }
    if (trimmedContact3 != "" && !trimmedContact3.match(/^https?:\/\//gi)) {
      trimmedContact3 = "http://" + trimmedContact3;
    }

    if (trimmedContact.length < 8 || trimmedContact.length > 200)
      return alert("Invalid URL");

    setIsLoading(true);

    console.log({ trimmedContact, trimmedContact2, trimmedContact3 });
    fetch(`http://localhost:8080/communities/${props.id}`, {
      method: "PATCH",
      headers: [["Content-Type", "application/json"]],
      body: JSON.stringify({
        contact: trimmedContact,
        contact2: trimmedContact2,
        contact3: trimmedContact3,
      }),
    }).then((res) => {
      if (res.ok) {
        toast({
          title: "Contatos modificados.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setIsLoading(false);
      } else {
        toast({
          title: "Contato não modificado.",
          description: "Contate um administrador.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        setIsLoading(false);
      }
    });
  };

  return (
    <>
      <IconButton aria-label='Configurações da comunidade' colorScheme="blue" size="lg" onClick={onOpen} icon={<EditIcon />} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modificar Contatos</ModalHeader>
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
