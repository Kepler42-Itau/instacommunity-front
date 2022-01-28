import User from "../models/User";
import {
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
import { NextRouter } from "next/router";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  router: NextRouter;
  followers: User[];
}

const FollowersModal = ({
  isOpen,
  onClose,
  router,
  followers,
}: ContactModalProps) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Lista de Seguidores</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {followers.map((follower: User, index: number) => (
              <Flex
                key={index}
                borderRadius="md"
                pt={1}
                pb={1}
                p={5}
                cursor="pointer"
                onClick={() => router.push(`/user/${follower.username}`)}
                boxShadow="base"
              >
                <Flex mb="3%">
                  <Avatar
                    size="lg"
                    name={follower.name}
                    src={follower.photoURL as string}
                  />
                  <Box ml="3">
                    <Text fontWeight="bold" mt="3%">
                      {follower.name}
                    </Text>
                    <Text fontSize="sm">{follower.username}</Text>
                  </Box>
                </Flex>
              </Flex>
            ))}
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FollowersModal;
