import { validateUserPermissions } from "../utils/validateUserPermissions";
import { useAuth } from "./useAuth";

type UseCanParams = {
  permissions?: string[];
  roles?: string[];
};

export function usePermissions({ permissions, roles }: UseCanParams) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) return false;

  const userHasValidPermissions = validateUserPermissions({
    user,
    roles,
    permissions,
  });

  return userHasValidPermissions;
}
