import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";

import DefaultPageWrapper from "../../components/common/DefaultPageWrapper";
import Pagination from "../../components/Pagination";

export default function UserList() {
  const isWideVersion = useBreakpointValue({ base: false, lg: true });

  useEffect(() => {
    fetch("http://localhost:3000/api/users")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <DefaultPageWrapper>
      <Flex mb="8" justify="space-between" align="center">
        <Heading size="lg" fontWeight="normal">
          Usuários
        </Heading>
        <Link href="/users/create" passHref>
          <Button
            as="a"
            size="sm"
            fontSize="small"
            colorScheme="pink"
            leftIcon={<Icon as={RiAddLine} fontSize="18" />}
            style={{ cursor: "pointer" }}
          >
            Criar novo
          </Button>
        </Link>
      </Flex>

      <TableContainer>
        <Table colorScheme="whiteAlpha">
          <Thead>
            <Tr>
              <Th px={["2", "2", "6"]}>
                <Checkbox colorScheme="pink" />
              </Th>
              <Th>Usuário</Th>
              {isWideVersion && <Th>Data de cadastro</Th>}
              <Th width="8"></Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td px={["2", "2", "6"]}>
                <Checkbox colorScheme="pink" />
              </Td>
              <Td>
                <Box>
                  <Text fontWeight="bold">Ryan Alencar</Text>
                  <Text fontSize={["xs", "sm"]} color="gray.300">
                    ryanalencar@gmail.com
                  </Text>
                </Box>
              </Td>
              {isWideVersion && <Td>04 de Junho, 2022</Td>}
              <Td>
                {isWideVersion ? (
                  <Button
                    size="sm"
                    fontSize="small"
                    colorScheme="purple"
                    leftIcon={<Icon as={RiPencilLine} fontSize="18" />}
                  >
                    Editar
                  </Button>
                ) : (
                  <IconButton
                    colorScheme="purple"
                    icon={<Icon as={RiPencilLine} fontSize="18" />}
                    aria-label="Edit User"
                  />
                )}
              </Td>
            </Tr>
          </Tbody>
        </Table>
        <Pagination />
      </TableContainer>
    </DefaultPageWrapper>
  );
}
