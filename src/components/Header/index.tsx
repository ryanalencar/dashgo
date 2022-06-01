import {
  Avatar,
  Box,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  Text,
} from "@chakra-ui/react";
import {
  RiNotificationLine,
  RiSearchLine,
  RiUserAddLine,
} from "react-icons/ri";

export default function Header() {
  return (
    <Flex
      as="header"
      w="100%"
      maxW={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      <Text fontSize="4xl" fontWeight="bold" letterSpacing="tight" w="64">
        dashgo
        <Text as="span" ml="1" color="pink.500">
          .
        </Text>
      </Text>

      <Flex
        as="label"
        flex="1"
        py="4"
        px="8"
        ml="6"
        maxW={400}
        alignSelf="center"
        color="gray.200"
        pos="relative"
        bg="gray.800"
        borderRadius="full"
      >
        <Input
          color="gray.50"
          variant="unstyled"
          px="4"
          mr="4"
          placeholder="Buscar na plataforma"
          _placeholder={{ color: "gray.500" }}
        />
        <Icon as={RiSearchLine} fontSize="20" />
      </Flex>

      <Flex align="center" ml="auto">
        <HStack
          spacing="4"
          mx="8"
          pr="8"
          py="1"
          color="gray.300"
          borderRightWidth={1}
          borderColor="gray.700"
        >
          <IconButton
            icon={<RiNotificationLine />}
            aria-label="Notifications"
            fontSize="20"
            variant="unstyled"
            _focus={{ boxShadow: "0", color: "pink.500" }}
            _hover={{ color: "gray.500" }}
          />
          <IconButton
            icon={<RiUserAddLine />}
            aria-label="Add User"
            fontSize="20"
            variant="unstyled"
            _focus={{ boxShadow: "0", color: "pink.500" }}
            _hover={{ color: "gray.500" }}
          />
        </HStack>

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
      </Flex>
    </Flex>
  );
}
