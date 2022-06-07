import { Button } from "@chakra-ui/react";

interface IPaginationItemProps {
  isCurrent?: boolean;
  number: number;
}

export default function PaginationItem({
  isCurrent = false,
  number,
}: IPaginationItemProps) {
  if (isCurrent) {
    return (
      <Button
        size="sm"
        fontSize="xs"
        width="4"
        colorScheme="pink"
        disabled
        _disabled={{ bg: "pink.500", cursor: "default" }}
      >
        {number}
      </Button>
    );
  } else {
    return (
      <Button
        size="sm"
        fontSize="xs"
        width="4"
        bg="gray.700"
        _hover={{ bg: "gray.500" }}
      >
        {number}
      </Button>
    );
  }
}
