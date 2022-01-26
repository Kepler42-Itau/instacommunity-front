import UserContext from "../../lib/UserContext";
import { useContext } from "react";
import NavBar from "../../components/NavBar";
import { Box, Flex, Heading, Center, Button } from "@chakra-ui/react";
import { Formik, Form, FormikHelpers } from "formik";
import { FieldBox, TextareaFieldBox } from "../../components/FieldBox";
import { createUser, updateUser } from "../../lib/Api"
import { useRouter } from "next/router";

const UserSettingsPage = () => {
  const { userBackend } = useContext(UserContext);

  return (
    <Box maxW="100vw" width="100%" mx="auto" px={{ base: 2, sm: 12, md: 17 }}>
      <NavBar />
      <Flex
        flexDirection="column"
        pt="2%"
        pr={{ base: "2%", xl: "10%" }}
        pl={{ base: "2%", xl: "10%" }}
        pb="5%"
      >
        <Heading
          mt="2%"
          fontSize="3xl"
          textAlign={{ base: "center", md: "left" }}
        >
          Configurações do Usuário
        </Heading>
        {!userBackend ? <FirstLogin /> : <ChangeInfo />}
      </Flex>
    </Box>
  );
};

interface UserSettingsValues {
  name: string;
  username: string;
  occupation?: string;
  about?: string | null;
  contactLink: string | null;
  contactTitle: string | null;
  photoURL?: string | null;
}

const ChangeInfo = () => {
  const { userBackend, setUserBackend } = useContext(UserContext);
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        name: userBackend?.name as string,
        username: userBackend?.username as string,
        occupation: userBackend?.occupation as string,
        about: userBackend?.about as string,
        contactLink: userBackend?.contact?.link as string,
        contactTitle: userBackend?.contact?.title as string,
        photoURL: userBackend?.photoURL as string,
      }}
      onSubmit={(
        values: UserSettingsValues,
        { setSubmitting, resetForm }: FormikHelpers<UserSettingsValues>
      ) => {
        setTimeout(() => {
          updateUser({
            name: values.name,
            username: values.username,
            occupation: values.occupation,
            about: values.about,
            contact: {
              link: values.contactLink,
              title: values.contactTitle as string
            },
            photoURL: values.photoURL,
            email: userBackend?.email as string,
            id: userBackend?.id as string,
          }).then((res) => {
            if ("error" in res) {
              setSubmitting(false);
            } else {
              setUserBackend({
                name: values.name,
                username: values.username,
                occupation: values.occupation,
                about: values.about,
                contact: {
                  link: values.contactLink,
                  title: values.contactTitle as string
                },
                photoURL: values.photoURL,
                email: userBackend?.email as string,
                id: userBackend?.id as string,
              })
              router.push(`/user/${userBackend?.username}`);
            }})
        }, 500);
      }}
    >
      {(props) => (
        <Form>
          <FieldBox
            name={"name"}
            title={"Nome"}
            isRequired={true}
            placeholder={"Ex: Fausto Silva"}
          />
          <FieldBox
            name={"photoURL"}
            title={"Link da imagem de perfil"}
            isRequired={false}
            placeholder={"Ex: https://i.imgur.com/WZIYQW0.png"}
          />
          <FieldBox
            name={"occupation"}
            title={"Ocupação"}
            isRequired={false}
            placeholder={"Ex: Apresentador"}
          />
          <Flex>
            <FieldBox
              name={"contactLink"}
              title={"Link do contato"}
              isRequired={false}
              placeholder={"Ex: aka.ms/fausto_silva"}
            />
            <Flex mr="1%" ml="1%" />
            <FieldBox
              name={"contactTitle"}
              title={"Título do contato"}
              isRequired={false}
              placeholder={"Ex: Grupo do WhatsApp"}
            />
          </Flex>
          <TextareaFieldBox
            name={"about"}
            title={"Sobre"}
            isRequired={false}
            placeholder={"Ex: Oloco bicho!"}
          />
          <Center mt="4%" mb="2%" width="100%">
            <Button colorScheme="red" type="reset" mr="5%" onClick={() => router.push(`/user/${userBackend?.username}`)}>
              Cancel
            </Button>
            <Button
              colorScheme="teal"
              isLoading={props.isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </Center>
        </Form>
      )}
    </Formik>
  );
};

const FirstLogin = () => {
  const {user} = useContext(UserContext);
  const router = useRouter();

  return (
    <Formik
      initialValues={{
        name: "",
        username: "",
        occupation: "",
        about: "",
        contactLink: "",
        contactTitle: "",
        photoURL: "",
      }}
      onSubmit={(
        values: UserSettingsValues,
        { setSubmitting, resetForm }: FormikHelpers<UserSettingsValues>
      ) => {
        setTimeout(() => {
          // TODO: Implement a real handleSubmit
          createUser({
            name: values.name,
            username: values.username,
            occupation: values.occupation,
            about: values.about,
            contact: {
              link: values.contactLink,
              title: values.contactTitle as string
            },
            photoURL: values.photoURL,
            email: user?.email as string,
            id: user?.uid as string,
          }).then((res) => {
            if ("error" in res) {
              setSubmitting(false);
            } else {
              router.push('/');
            }
          })

        }, 500);
      }}
    >
      {(props) => (
        <Form>
          <FieldBox
            name={"name"}
            title={"Nome"}
            isRequired={true}
            placeholder={"Ex: Fausto Silva"}
          />
          <FieldBox
            name={"username"}
            title={"Nome de usuário"}
            isRequired={true}
            placeholder={"Ex: f_silva"}
          />
          <FieldBox
            name={"photoURL"}
            title={"Link da imagem de perfil"}
            isRequired={false}
            placeholder={"Ex: https://i.imgur.com/WZIYQW0.png"}
          />
          <FieldBox
            name={"occupation"}
            title={"Ocupação"}
            isRequired={false}
            placeholder={"Ex: Apresentador"}
          />
          <Flex>
            <FieldBox
              name={"contactLink"}
              title={"Link do contato"}
              isRequired={false}
              placeholder={"Ex: aka.ms/fausto_silva"}
            />
            <Flex mr="1%" ml="1%" />
            <FieldBox
              name={"contactTitle"}
              title={"Título do contato"}
              isRequired={false}
              placeholder={"Ex: Grupo do WhatsApp"}
            />
          </Flex>
          <TextareaFieldBox
            name={"about"}
            title={"Sobre"}
            isRequired={false}
            placeholder={"Ex: Oloco bicho!"}
          />
          <Center mt="4%" mb="2%" width="100%">
            <Button colorScheme="red" type="reset" mr="5%">
              Cancel
            </Button>
            <Button
              colorScheme="teal"
              isLoading={props.isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </Center>
        </Form>
      )}
    </Formik>
  );
};

export default UserSettingsPage;
