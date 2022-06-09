import {
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import DefaultPageWrapper from "../../components/common/DefaultPageWrapper";
import { Input } from "../../components/Form";
import PasswordInput from "../../components/Form/Input/PasswordInput";

export default function CreateUser() {
  return (
    <DefaultPageWrapper>
      <Heading size="lg" fontWeight="normal">
        Cria Usuário
      </Heading>

      <Divider my="6" borderColor="gray.700" />

      <VStack spacing="8">
        <SimpleGrid w="100%" minChildWidth="240px" spacing={["6", "8"]}>
          <Input name="name" label="Nome completo" />
          <Input name="email" type="email" label="E-mail" />
        </SimpleGrid>
        <SimpleGrid w="100%" minChildWidth="240px" spacing={["6", "8"]}>
          <PasswordInput name="password" label="Senha" />
          <PasswordInput
            name="password_confirmation"
            label="Confirmação da senha"
          />
        </SimpleGrid>
      </VStack>

      <Flex mt="8" justify="flex-end">
        <HStack spacing="4">
          <Link href="/users" passHref>
            <Button as="a" colorScheme="whiteAlpha">
              Cancelar
            </Button>
          </Link>
          <Button colorScheme="pink">Salvar</Button>
        </HStack>
      </Flex>
    </DefaultPageWrapper>
  );
}
