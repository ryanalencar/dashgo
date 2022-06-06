import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";

import DefaultPageWrapper from "../../components/common/DefaultPageWrapper";
import Pagination from "../../components/Pagination";

export default function UserList() {
  return (
    <DefaultPageWrapper>
      <Flex mb="8" justify="space-between" align="center">
        <Heading size="lg" fontWeight="normal">
          Usuários
        </Heading>
        <Button
          size="sm"
          fontSize="small"
          colorScheme="pink"
          leftIcon={<Icon as={RiAddLine} fontSize="18" />}
        >
          Criar novo
        </Button>
      </Flex>

      <TableContainer>
        <Table colorScheme="whiteAlpha">
          <Thead>
            <Tr>
              <Th px="6">
                <Checkbox colorScheme="pink" />
              </Th>
              <Th>Usuário</Th>
              <Th>Data de cadastro</Th>
              <Th width="8"></Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td px="6">
                <Checkbox colorScheme="pink" />
              </Td>
              <Td>
                <Box>
                  <Text fontWeight="bold">Ryan Alencar</Text>
                  <Text fontSize="sm" color="gray.300">
                    ryanalencar@gmail.com
                  </Text>
                </Box>
              </Td>
              <Td>04 de Junho, 2022</Td>
              <Td>
                <Button
                  size="sm"
                  fontSize="small"
                  colorScheme="purple"
                  leftIcon={<Icon as={RiPencilLine} fontSize="18" />}
                >
                  Editar
                </Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
        <Pagination />
      </TableContainer>
    </DefaultPageWrapper>
  );
}
