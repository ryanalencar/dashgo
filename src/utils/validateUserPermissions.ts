type User = {
  permissions: string[];
  roles: string[];
};

type ValidateUserPermissionsParams = {
  user: User;
  permissions?: string[];
  roles?: string[];
};

export function validateUserPermissions({
  user,
  roles,
  permissions,
}: ValidateUserPermissionsParams) {
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
