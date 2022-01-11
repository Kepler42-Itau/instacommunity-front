import { useDisclosure } from "@chakra-ui/hooks";
import { useRef } from "react";
import React, { useState } from "react";
import User from '../models/User'
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Text,
  ModalBody,
  ModalFooter,
  Flex,
  Avatar,
  Box,
} from "@chakra-ui/react";

export default function ContactModal(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Text size="lg" onClick={onOpen}> ver mais </Text>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Lista de Seguidores</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {props.followers.map((follower: User, index: number) => (
              <Flex key={index} borderRadius="md" pt={1} pb={1} p={5} boxShadow="base">
                <Flex mb="3%" >
                  <Avatar size='lg' name={follower.name} />
                  <Box ml='3'>
                    <Text fontWeight='bold' mt="3%">
                      {follower.name}
                    </Text>
                    <Text fontSize='sm'>{follower.username}</Text>
                  </Box>
                </Flex>
              </Flex>
            )) }

          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Fechar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
