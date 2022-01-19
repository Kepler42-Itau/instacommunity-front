import {
  Avatar,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  GridItem,
  Text,
} from "@chakra-ui/react";
import { NextRouter } from "next/router";
import Community from "../models/Community";

interface CommunityGridProps {
  communityList: Community[];
  router: NextRouter;
}

const CommunityGrid = ({ communityList, router }: CommunityGridProps) => {
  return (
    <SimpleGrid columns={1}>
      {communityList.map((community: Community, index: number) => (
        <CommunityGridItem community={community} router={router} key={index} />
      ))}
    </SimpleGrid>
  );
};

interface CommunityGridItemProps {
  community: Community;
  router: NextRouter;
}

const CommunityGridItem = ({ community, router }: CommunityGridItemProps) => {
  return (
    <GridItem
      onClick={() => router.push(`/communities/${community.id}`)}
      cursor="pointer"
    >
      <Flex
        borderRadius="lg"
        boxShadow="lg"
        mt="3%"
        mb="3%"
        pb="3%"
        pt="3%"
        rounded="lg"
        _hover={{
          boxShadow: "xl",
        }}
        transition="box-shadow 0.2s"
      >
        <Container centerContent maxW="container.xl" flexDirection="row">
          <Avatar
            name={community.name}
            src={community.photoURL as string}
            size="lg"
            shadow="base"
            m="4%"
            mt="0%"
            mb="0%"
          />
          <Flex justifyContent="center" flexDirection="column" ml="0%" m="3%">
            <Heading textAlign="left" fontSize="xl" pb="2%">
              {community.name}
            </Heading>
            <Text textAlign="left" fontSize={{ base: "md", xl: "xs" }}>
              {community.description}
            </Text>
          </Flex>
        </Container>
      </Flex>
    </GridItem>
  );
};

export default CommunityGrid;
