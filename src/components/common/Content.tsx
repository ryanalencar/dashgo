import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

interface IContentProps {
  children: ReactNode;
}

export default function Content({ children }: IContentProps) {
  const MAX_WIDTH = 1480;
  return (
    <Flex w="100%" my="6" maxW={MAX_WIDTH} mx="auto" px="6">
      {children}
    </Flex>
  );
}
