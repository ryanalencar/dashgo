import { Box, Button, HStack } from "@chakra-ui/react";

import PaginationItem from "./PaginationItem";

export default function Pagination() {
  return (
    <HStack spacing="6" mt="8" mb="1" justify="space-between" align="center">
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>
      <HStack spacing="2">
        <PaginationItem number={1} isCurrent />
        <PaginationItem number={2} />
        <PaginationItem number={3} />
      </HStack>
    </HStack>
  );
}
