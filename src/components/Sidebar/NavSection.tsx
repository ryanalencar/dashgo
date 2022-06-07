import { Box, Stack, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { RiContactsLine, RiDashboardLine } from "react-icons/ri";
import NavItem from "./NavItem";

interface INavSectionProps {
  title: string;
  children: ReactNode;
}

export default function NavSection({ title, children }: INavSectionProps) {
  return (
    <Box>
      <Text
        fontWeight="bold"
        color="gray.400"
        fontSize="small"
        textTransform="uppercase"
      >
        {title}
      </Text>
      <Stack spacing="4" mt="8" align="stretch">
        {children}
      </Stack>
    </Box>
  );
}
