import { Box, Stack, Text } from "@chakra-ui/react";
import {
  RiContactsLine,
  RiDashboardLine,
  RiGitMergeLine,
  RiInputMethodLine,
} from "react-icons/ri";

import NavItem from "./NavItem";

export default function Sidebar() {
  return (
    <Box as="aside" w="64" mr="8">
      <Stack spacing="12" align="flex-start">
        <Box>
          <Text
            fontWeight="bold"
            color="gray.400"
            fontSize="small"
            textTransform="uppercase"
          >
            geral
          </Text>
          <Stack spacing="4" mt="8" align="stretch">
            <NavItem
              href="/dashboard"
              icon={RiDashboardLine}
              text="dashboard"
            />
            <NavItem href="/users" icon={RiContactsLine} text="usuários" />
          </Stack>
        </Box>
        <Box>
          <Text
            fontWeight="bold"
            color="gray.400"
            fontSize="small"
            textTransform="uppercase"
          >
            automação
          </Text>
          <Stack spacing="4" mt="8" align="stretch">
            <NavItem href="" icon={RiInputMethodLine} text="formulários" />
            <NavItem href="" icon={RiGitMergeLine} text="automação" />
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
