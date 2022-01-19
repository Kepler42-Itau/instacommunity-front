import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Icon,
  Flex,
  Container,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { loginWithGoogle } from "../../lib/Firebase";
import UserContext from "../../lib/UserContext";
import { FcGoogle } from "react-icons/fc";
import { GoogleButton } from "../../components/GoogleButton";

const Register = () => {
  const router = useRouter();
  const { user, userBackend } = useContext(UserContext);

  const textValue = useColorModeValue("gray.800", "white");

  useEffect(() => {
    if (user !== null) {
      if (userBackend != null) {
        router.push("/user/settings");
      } else {
        router.push("/");
      }
    }
  }, [user]);

  return (
    <Flex
      flexDirection="column"
      justifyContent="Center"
      pr={{ base: "10%", xl: "20%" }}
      pl={{ base: "10%", xl: "20%" }}
      pt="auto"
      height="100vh"
      width="100vw"
    >
      <Container
        centerContent
        maxW="container.xl"
        flex="3"
        justifyContent="center"
        ml="auto"
        mb="20%"
      >
        <Text
          bgGradient="linear(to-r, #FF7900, #9D4EDD)"
          bgClip="text"
          width="100%"
          fontSize={{ base: "3xl", md: "6xl" }}
          fontWeight="extrabold"
          userSelect="none"
          textAlign={{ base: "center", md: "left" }}
          _hover={{
            bgGradient: "linear(to-r, #ff6d00, #7B2CBF)",
          }}
          _active={{
            transform: "scale(0.98)",
          }}
          transition="all 0.2s ease-in-out"
        >
          InstaCommunity
        </Text>
        <Text
          textAlign={{ base: "justify", md: "left" }}
          fontSize={{ base: "sm", md: "lg" }}
          mt={{ base: "10%", md: "0" }}
          width="100%"
        >
          For people who seek developing bonds of knowledge with others, the
          challenge to find people with same interests and abilities with whom
          we can share, this web application is a social media to connect
          everyone in this category, a refreshing way of making new friends...
        </Text>
        <Text
          textAlign={{ base: "justify", md: "left" }}
          fontSize={{ base: "sm", md: "lg" }}
          mt="1"
          width="100%"
        >
          The InstaCommunity surely will meet your expectations and likes in the
          most practical and fun way!
        </Text>
        {!user && (
          <GoogleButton
            mr={{ base: "0", md: "auto" }}
            mt={{ base: "10%", md: "4%" }}
            boxShadow="base"
            transition="box-shadow 0.2s"
            _hover={{
              boxShadow: "lg",
            }}
            size="lg"
            colorScheme="whiteAlpha"
            leftIcon={<Icon as={FcGoogle} w={8} h={8} />}
            onClick={() => loginWithGoogle()}
          >
            <Text color={textValue}>Sign in with Google</Text>
          </GoogleButton>
        )}
      </Container>
    </Flex>
  );
};

export default Register;
