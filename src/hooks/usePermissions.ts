import { useAuth } from "./useAuth";

type UseCanParams = {
  permissions?: string[];
  roles?: string[];
};

export function usePermissions({ permissions, roles }: UseCanParams) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) return false;

  if (permissions?.length > 0) {
    const hasAllPermissions = permissions?.every((permission) => {
      return user.permissions.includes(permission);
    });

    if (!hasAllPermissions) return false;
  }

  if (roles?.length > 0) {
    const hasAllRoles = roles?.some((role) => {
      return user.roles.includes(role);
    });

    if (!hasAllPermissions) return false;
  }

  return true;
}
