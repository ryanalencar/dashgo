import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  IconButton,
  Link,
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
import NextLink from "next/link";
import { useState } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";

import DefaultPageWrapper from "../../components/common/DefaultPageWrapper";
import Pagination from "../../components/Pagination";
import { useUsers } from "../../hooks/useUsers";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";

export default function UserList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, error } = useUsers(page);

  const isWideVersion = useBreakpointValue({ base: false, lg: true });

  const handlePrefetchUser = async (userId: string) => {
    await queryClient.prefetchQuery(
      ["user", userId],
      async () => {
        const response = await api.get(`/users/${userId}`);
        return response;
      },
      { staleTime: 1000 * 60 * 10 }
    );
  };

  return (
    <DefaultPageWrapper>
      <Flex mb="8" justify="space-between" align="center">
        <Heading size="lg" fontWeight="normal">
          Usuários
          {!isLoading && isFetching && (
            <Spinner size="sm" color="gray.500" ml="4" />
          )}
        </Heading>
        <NextLink href="/users/create" passHref>
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
        </NextLink>
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
                {data?.users.map((user) => (
                  <Tr key={user.id}>
                    <Td px={["2", "2", "6"]}>
                      <Checkbox colorScheme="pink" />
                    </Td>
                    <Td>
                      <Box>
                        <Link
                          color="purple.500"
                          onMouseEnter={() => handlePrefetchUser(user.id)}
                        >
                          <Text fontWeight="bold">{user.name}</Text>
                        </Link>
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
              totalCountOfRegisters={data?.totalCount ?? 0}
              currentPage={page}
              onPageChange={setPage}
            />
          </>
        )}
      </TableContainer>
    </DefaultPageWrapper>
  );
}
