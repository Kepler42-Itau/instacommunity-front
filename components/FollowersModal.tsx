import User from "../models/User";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Text,
  ModalBody,
  Tooltip,
  ModalFooter,
  Flex,
  Avatar,
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
          <ModalBody pb="6%">
            {followers.map((follower: User, index: number) => (
              <Tooltip
                label={`Ver perfil de ${follower.name}`}
                aria-label={`Ver perfil de ${follower.name}`}
                placement="bottom-start"
              >
                <Flex
                  _hover={{ shadow: "md" }}
                  key={index}
                  borderRadius="md"
                  pt="1%"
                  pb="1%"
                  p="6%"
                  mb="3%"
                  cursor="pointer"
                  onClick={() => router.push(`/user/${follower.username}`)}
                  boxShadow="base"
                >
                  <Flex>
                    <Avatar
                      size="lg"
                      name={follower.name}
                      src={follower.photoURL as string}
                    />
                    <Flex ml="3" flexDirection="column" justifyContent="center">
                      <Text fontWeight="bold" mt="3%" textAlign="left">
                        {follower.name}
                      </Text>
                      <Text fontSize="sm" textAlign="left">
                        {follower.username}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Tooltip>
            ))}
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FollowersModal;
