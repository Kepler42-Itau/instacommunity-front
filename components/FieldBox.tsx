import { Field } from "formik";
import {
  Select,
  Textarea,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";

interface FieldBoxProps {
  name: string;
  title: string;
  placeholder: string;
  isRequired: boolean;
}

export const FieldBox = ({
  name,
  title,
  placeholder,
  isRequired,
}: FieldBoxProps) => {
  return (
    <Field name={name}>
      {({ field, form }: any) => (
        <FormControl
          mt="3%"
          isRequired={isRequired}
          isInvalid={form.errors.name && form.touched.name}
        >
          <FormLabel htmlFor={name}>{title}</FormLabel>
          <Input {...field} id={name} placeholder={placeholder} />
          <FormErrorMessage>{form.errors.name}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

export const TextareaFieldBox = ({
  name,
  title,
  placeholder,
  isRequired,
}: FieldBoxProps) => {
  return (
    <Field name={name}>
      {({ field, form }: any) => (
        <FormControl
          mt="3%"
          isRequired={isRequired}
          isInvalid={form.errors.name && form.touched.name}
        >
          <FormLabel htmlFor={name}>{title}</FormLabel>
          <Textarea {...field} id={name} placeholder={placeholder} />
          <FormErrorMessage>{form.errors.name}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};
