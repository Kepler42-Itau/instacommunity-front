import { useDisclosure } from "@chakra-ui/hooks";
import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  FormControl,
  ModalBody,
  ModalFooter,
  Input,
  useToast,
  Textarea,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import Community from "../models/Community";
import ErrorResponse from "../models/ErrorResponse";

const SearchModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchTerm(event.target.value);

  return (
    <>
      <Button
        aria-label="Pesquisa"
        onClick={onOpen}
        mr={{ base: "1%", xl: "3%" }}
      >
        <SearchIcon />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pesquisa</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl id="pesquisa" isRequired>
              <Input size="sm" value={searchTerm} onChange={handleChange} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SearchModal;
