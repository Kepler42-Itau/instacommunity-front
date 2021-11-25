import type { NextPage } from "next";
import React, { useEffect } from "react";

import {
	Avatar,
	Button,
	Box,
	Flex,
	Center,
	List,
	ListItem,
	Text,
  } from "@chakra-ui/react";
  import { useRouter } from "next/router";
import Community from "../models/Community";

interface ListProps {
  list: Community[],
}

export default function CommunityList({ list }: ListProps) {
	const router = useRouter()

	return (
		<Center>
        {
          <List w="40%">
            {list.map((community: any, index: any) => {
              return (
                <ListItem
                  key={community.id}
                  onClick={() => router.push(`/communities/${community.id}`)}
                  cursor="pointer"
                  w="100%"
                  _hover={{
                    color: "#ED8936",
                  }}
                >
                  <Flex
                    border="1px"
                    borderColor="gray.600"
                    borderRadius="md"
                    m="3%"
                  >
                    <Avatar name={community.name} size="md" m="4%" />
                    <Box ml="0%" m="4%">
                      <Text fontSize="md">{community.name}</Text>
                      <Text fontSize="xs">{community.description}</Text>
                    </Box>
                  </Flex>
                </ListItem>
              );
            })}
          </List>
        }
      </Center>
	)
}
