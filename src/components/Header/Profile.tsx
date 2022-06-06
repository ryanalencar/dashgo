import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

export default function Profile() {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Ryan Alencar</Text>
        <Text color="gray.300" fontSize="small">
          ryanalencarbarbosa1701@gmail.com
        </Text>
      </Box>

      <Avatar
        size="md"
        name="Ryan Alencar"
        src="https://github.com/ryanalencar.png"
        bg="pink.500"
      />
    </Flex>
  );
}
