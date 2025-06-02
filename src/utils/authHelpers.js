import { UnauthorizedAccess } from './custom-errors.js'

export function requirePermission(user, allowedRoles) {
  if (!allowedRoles.includes(user.permissionLevel)) {
    throw new UnauthorizedAccess()
  }
}
export const ONLY_MEMBER = ['Member']
export const ADMIN_OR_MANAGER = ['Manager', 'Admin']
export const ALL_ROLES = ['Member', 'Manager', 'Admin']
