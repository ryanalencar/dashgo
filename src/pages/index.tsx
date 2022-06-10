import { Button, Flex, Stack } from "@chakra-ui/react";
import type { NextPage } from "next";
import { SubmitHandler, useForm } from "react-hook-form";

import { Input } from "../components/Form";
import { PasswordInput } from "../components/Form/Input/PasswordInput";

type FormData = {
  email: string;
  password: string;
};

const SignIn: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>();

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
          <Input label="E-mail" {...register("email", { required: true })} />
          <PasswordInput label="Senha" {...register("password")} />
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
