import { ReactNode } from "react";
import { usePermissions } from "../../hooks/usePermissions";

interface ICanProps {
  children: ReactNode;
  permissions?: string[];
  roles?: string[];
}

export default function Can({ children, permissions, roles }: ICanProps) {
  const userCanSeeComponent = usePermissions({ permissions, roles });

  if (!userCanSeeComponent) return null;

  return <>{children}</>;
}
