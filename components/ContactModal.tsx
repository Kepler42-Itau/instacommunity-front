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
  FormControl,
  FormLabel,
  ModalBody,
  ModalFooter,
  Input,
  useToast,
} from "@chakra-ui/react";
import { LinkIcon } from "@chakra-ui/icons";

export default function ContactModal(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [contact, setContact] = useState(props.initialContact);
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setContact(event.target.value)

  const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    let trimmedContact = contact.trim();
    if (!trimmedContact.match(/^https?:\/\//gi)) {
      trimmedContact = "http://" + trimmedContact;
    }

    if (trimmedContact.length < 8 || trimmedContact.length > 200)
      return alert("Invalid URL");

    setIsLoading(true)
    fetch(`http://localhost:8080/communities/${props.id}`, {
      method: "PATCH",
      headers: [["Content-Type", "application/json"]],
      body: JSON.stringify({ contact: trimmedContact }),
    }).then((res) => {
      if (res.ok) {
        toast({
          title: "Contato modificado.",
          description: "O novo contato foi adicionado na comunidade.",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        setIsLoading(false)
      } else {
        toast({
          title: "Contato não modificado.",
          description: "Contate um administrador.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        setIsLoading(false)
      }
    });
  };

  return (
    <>
      <Button
        md="1%"
        rightIcon={<LinkIcon />}
        colorScheme="blue"
        onClick={onOpen}
      >
        Alterar Contato
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Mudar contato</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Contato</FormLabel>
              <Input
                placeholder="ex: https://aka.ms/COBOL"
                size="sm"
                value={contact}
                onChange={handleChange}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" isLoading={isLoading} mr={3} onClick={handleSubmit}>
              Salvar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
