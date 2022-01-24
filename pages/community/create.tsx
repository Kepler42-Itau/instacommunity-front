import { Button, Center, Heading, Flex, Box } from "@chakra-ui/react";
import NavBar from "../../components/NavBar";
import { Formik, Form, FormikHelpers } from "formik";
import {
  FieldBox,
  TypeFieldBox,
  TextareaFieldBox,
} from "../../components/FieldBox";

interface CreateCommunityFormValues {
  name: string;
  description: string;
  contactOne: string;
  contactOneTitle: string;
  contactTwo: string;
  contactTwoTitle: string;
  contactThree: string;
  contactThreeTitle: string;
  photoURL: string;
  type: string;
}

const CreateCommunityPage = () => {
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
          Criação de comunidade
        </Heading>
        <CreateCommunityForm />
      </Flex>
    </Box>
  );
};

const CreateCommunityForm = () => {
  return (
    <>
      <Formik
        initialValues={{
          name: "",
          description: "",
          contactOne: "",
          contactOneTitle: "",
          contactTwo: "",
          contactTwoTitle: "",
          contactThree: "",
          contactThreeTitle: "",
          photoURL: "",
          type: "",
        }}
        onSubmit={(
          values: CreateCommunityFormValues,
          { setSubmitting, resetForm }: FormikHelpers<CreateCommunityFormValues>
        ) => {
          setTimeout(() => {
            // TODO: Implement a real handleSubmit
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
      >
        {(props) => (
          <Form>
            <FieldBox
              name={"name"}
              title={"Name"}
              isRequired={true}
              placeholder={"Ex: Amigos do COBOL"}
            />
            <FieldBox
              name={"photoURL"}
              title={"Link da imagem"}
              isRequired={true}
              placeholder={"Ex: https://i.imgur.com/knVYL2s.png"}
            />
            <TypeFieldBox
              name={"type"}
              title={"Tipo da comunidade"}
              isRequired={true}
              placeholder={"Selecione o tipo da comunidade"}
            />
            <Flex>
              <FieldBox
                name={"contactOne"}
                title={"Link do contato"}
                isRequired={true}
                placeholder={"Ex: https://aka.ms/COBOL"}
              />
              <Flex mr="1%" ml="1%" />
              <FieldBox
                name={"contactOneTitle"}
                title={"Título do contato"}
                isRequired={true}
                placeholder={"Ex: Grupo do Teams"}
              />
            </Flex>
            <Flex>
              <FieldBox
                name={"contactTwo"}
                title={"Link do contato"}
                isRequired={false}
                placeholder={"Opcional"}
              />
              <Flex mr="1%" ml="1%" />
              <FieldBox
                name={"contactTwoTitle"}
                title={"Título do contato"}
                isRequired={false}
                placeholder={"Opcional"}
              />
            </Flex>
            <Flex>
              <FieldBox
                name={"contactThree"}
                title={"Link do contato"}
                isRequired={false}
                placeholder={"Opcional"}
              />
              <Flex mr="1%" ml="1%" />
              <FieldBox
                name={"contactThreeTitle"}
                title={"Título do contato"}
                isRequired={false}
                placeholder={"Opcional"}
              />
            </Flex>
            <TextareaFieldBox
              name={"description"}
              title={"Description"}
              isRequired={true}
              placeholder={"Ex: Juntos desde o paleozoico"}
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
    </>
  );
};

export default CreateCommunityPage;
