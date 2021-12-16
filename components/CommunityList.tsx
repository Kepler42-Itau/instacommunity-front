import {
  Avatar,
  Box,
  Flex,
  Center,
  List,
  Heading,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Community from "../models/Community";

interface ListProps {
  list: Community[];
}

export default function CommunityList({ list }: ListProps) {
  const router = useRouter();

  return (
    <Center>
      {
        <List w="40%">
          {list.map((community: any, index: any) => {
            return (
              <ListItem
                key={index}
                onClick={() => router.push(`/communities/${community.id}`)}
                cursor="pointer"
                w="100%"
                _hover={{
                  color: "#ED8936",
                }}
              >
                <Flex
                  borderRadius="lg"
                  p="2%"
                  pb="3%"
                  m="3%"
                  boxShadow="lg"
                  rounded="lg"
                  _hover={{
                    boxShadow: "xl"
                  }}
                >
                  <Center flexDirection="row" width="100%">
                    <Box>
                      <Avatar name={community.name} size="lg" m="4%"/>
                    </Box>
                    <Flex flexDirection="column" ml="0%" m="3%" width="80%" maxwidth="70%" height="70%" maxHeight="70%">
                      <Heading textAlign="left" fontSize="lg" pb="2%">{community.name}</Heading>
                      <Text fontSize="xs">{community.description}</Text>
                    </Flex>
                  </Center>
                </Flex>
              </ListItem>
            );
          })}
        </List>
      }
    </Center>
  );
}



