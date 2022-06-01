import { Button, Flex, Stack } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import type { NextPage } from "next";
import { useState } from "react";

import { Input } from "../components/Form";

const Home: NextPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((oldShowPassword) => !oldShowPassword);
  };

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        w="100%"
        maxW={360}
        bg="gray.800"
        p={8}
        borderRadius={8}
        flexDir="column"
      >
        <Stack spacing={6}>
          <Input name="email" label="E-mail" />
          <Input
            name="password"
            label="Senha"
            type={showPassword ? "text" : "password"}
            icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
            ariaLabel={showPassword ? "Hide Password" : "Show Password"}
            onClick={handleShowPassword}
          />
        </Stack>

        <Button type="submit" mt={6} colorScheme="pink" size="lg">
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
};

export default Home;
