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
import { useRouter } from "next/router";

export default function ContactModal(props: any) {
  const noOfFollowers = props.followers.length;
  const isOpen = props.isOpen;
  const onClose = props.onClose;
  const router = useRouter();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Lista de Seguidores</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {props.followers.map((follower: User, index: number) => (
              <Flex key={index} borderRadius="md" pt={1} pb={1} p={5} cursor="pointer" onClick={() => router.push(`/user/${follower.username}`)} boxShadow="base">
                <Flex mb="3%" >
                  {
                    follower.usePhoto ? (<Avatar size='lg' name={follower.name} src={follower.photoURL} />) : (<Avatar size='lg' name={follower.name} />)
                  }
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
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
