import { Button, Flex, Stack } from "@chakra-ui/react";
import type { NextPage } from "next";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Input } from "../components/Form";
import { PasswordInput } from "../components/Form/Input/PasswordInput";

type FormData = {
  email: string;
  password: string;
};

const signInFormSchema = yup
  .object()
  .shape({
    email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
    password: yup.string().required("Senha obrigatória"),
  })
  .required();

const SignIn: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormData>({ resolver: yupResolver(signInFormSchema) });

  const handleSignIn: SubmitHandler<FormData> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        onSubmit={handleSubmit(handleSignIn)}
        as="form"
        w="100%"
        maxW={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
      >
        <Stack spacing="4">
          <Input label="E-mail" error={errors.email} {...register("email")} />
          <PasswordInput
            error={errors.password}
            label="Senha"
            {...register("password")}
          />
        </Stack>

        <Button
          type="submit"
          mt="6"
          colorScheme="pink"
          size="lg"
          isLoading={isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
};

export default SignIn;
