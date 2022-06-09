import { Stack } from "@chakra-ui/react";
import {
  RiContactsLine,
  RiDashboardLine,
  RiGitMergeLine,
  RiInputMethodLine,
} from "react-icons/ri";

import NavItem from "./NavItem";
import NavSection from "./NavSection";

export default function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="geral">
        <NavItem href="/dashboard" icon={RiDashboardLine} text="dashboard" />
        <NavItem href="/users" icon={RiContactsLine} text="usuários" />
      </NavSection>
      <NavSection title="automação">
        <NavItem href="/forms" icon={RiInputMethodLine} text="formulários" />
        <NavItem href="/automation" icon={RiGitMergeLine} text="automação" />
      </NavSection>
    </Stack>
  );
}
