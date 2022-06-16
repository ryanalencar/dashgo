import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as yup from "yup";

import DefaultPageWrapper from "../../components/common/DefaultPageWrapper";
import { Input } from "../../components/Form";
import { PasswordInput } from "../../components/Form/Input/PasswordInput";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";

const createUserFormSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: yup
    .string()
    .required("Senha obrigatória")
    .min(6, "No mínimo 6 caracteres"),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref("password")], "A senha deve ser a mesma"),
});

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export default function CreateUser() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateUserFormData>({
    resolver: yupResolver(createUserFormSchema),
  });
  const createUser = useMutation(
    async (user: CreateUserFormData) => {
      const response = await api.post("users", {
        user: {
          ...user,
          created_at: new Date(),
        },
      });

      return response.data.user;
    },
    {
      onSuccess() {
        queryClient.invalidateQueries("users");
      },
    }
  );

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (data) => {
    await createUser.mutateAsync(data);

    router.push("/users");
  };

  return (
    <DefaultPageWrapper>
      <Heading size="lg" fontWeight="normal">
        Cria Usuário
      </Heading>

      <Divider my="6" borderColor="gray.700" />

      <Box as="form" onSubmit={handleSubmit(handleCreateUser)}>
        <VStack spacing="8">
          <SimpleGrid w="100%" minChildWidth="240px" spacing={["6", "8"]}>
            <Input
              label="Nome completo"
              error={errors.name}
              {...register("name")}
            />
            <Input
              type="email"
              label="E-mail"
              error={errors.email}
              {...register("email")}
            />
          </SimpleGrid>
          <SimpleGrid w="100%" minChildWidth="240px" spacing={["6", "8"]}>
            <PasswordInput
              label="Senha"
              error={errors.password}
              {...register("password")}
            />
            <PasswordInput
              label="Confirmação da senha"
              error={errors.password_confirmation}
              {...register("password_confirmation")}
            />
          </SimpleGrid>
        </VStack>

        <Flex mt="8" justify="flex-end">
          <HStack spacing="4">
            <Link href="/users" passHref>
              <Button as="a" colorScheme="whiteAlpha" disabled={isSubmitting}>
                Cancelar
              </Button>
            </Link>
            <Button type="submit" colorScheme="pink" isLoading={isSubmitting}>
              Salvar
            </Button>
          </HStack>
        </Flex>
      </Box>
    </DefaultPageWrapper>
  );
}
