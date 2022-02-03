import { Box, Text, Flex, Link } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box width="100%">
      <Flex width="100%" flexDirection="column">
        <Link href="https://github.com/kepler-ft" isExternal>
          <Text ml="auto" mr="auto">
            © 2021 Kepler 42
          </Text>
        </Link>
      </Flex>
    </Box>
  );
};

export default Footer;
