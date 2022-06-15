import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  IconButton,
  Spinner,
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
import { RiAddLine, RiPencilLine } from "react-icons/ri";

import DefaultPageWrapper from "../../components/common/DefaultPageWrapper";
import Pagination from "../../components/Pagination";
import { useUsers } from "../../hooks/useUsers";

export default function UserList() {
  const { data, isLoading, isFetching, error } = useUsers();

  const isWideVersion = useBreakpointValue({ base: false, lg: true });

  return (
    <DefaultPageWrapper>
      <Flex mb="8" justify="space-between" align="center">
        <Heading size="lg" fontWeight="normal">
          Usuários
          {!isLoading && isFetching && (
            <Spinner size="sm" color="gray.500" ml="4" />
          )}
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
        {isLoading ? (
          <Flex justify="center">
            <Spinner size="xl" color="pink.500" />
          </Flex>
        ) : error ? (
          <Flex justify="start">
            <Text color="red.400">Falha ao obter dados dos usuários.</Text>
          </Flex>
        ) : (
          <>
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
                {data?.map((user) => (
                  <Tr key={user.id}>
                    <Td px={["2", "2", "6"]}>
                      <Checkbox colorScheme="pink" />
                    </Td>
                    <Td>
                      <Box>
                        <Text fontWeight="bold">{user.name}</Text>
                        <Text fontSize={["xs", "sm"]} color="gray.300">
                          {user.email}
                        </Text>
                      </Box>
                    </Td>
                    {isWideVersion && <Td>{user.createdAt}</Td>}
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
                ))}
              </Tbody>
            </Table>
            <Pagination
              totalCountOfRegisters={200}
              currentPage={5}
              onPageChange={() => {}}
            />
          </>
        )}
      </TableContainer>
    </DefaultPageWrapper>
  );
}
