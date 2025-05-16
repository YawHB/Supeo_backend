import { UserGroupDoesNotExist, PermissionLevelDoesNotExist } from '../../utils/custom-errors.js'
import {
  findAllEmployees,
  getAllEmployees,
  findAllEmployeeTimeEntries,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  getAllRoles,
  getAllPermissions,
  findRoleIdByName,
  findPermissionIdByLevel,
  //countEmployees,
  //getEmployeesPaginated,
} from './employee.repository.js'

export function getEmployees(sql) {
  return getAllEmployees(sql)
}

export async function fetchEmployee(employeeID, sql) {
  return await findAllEmployees(employeeID, sql)
}

export async function fetchEmployeeTimeEntries(employee, sql) {
  return await findAllEmployeeTimeEntries(employee, sql)
}

export async function getEmployee(employeeID) {
  return getEmployeeById(employeeID)
}

export async function addNewEmployee(employee) {
  const { roleName, permissionLevel, email } = employee

  let [role] = await findRoleIdByName(roleName)
  let [permission] = await findPermissionIdByLevel(permissionLevel)

  if (!role) throw new UserGroupDoesNotExist()
  if (!permission) throw new PermissionLevelDoesNotExist()

  return await createEmployee(employee, role.id, permission.id)
}

export function editEmployee(sql, id, employee) {
  return updateEmployee(sql, id, employee)
}

export async function getRoles(sql) {
  return await getAllRoles(sql)
}

export async function getPermissions(sql) {
  return await getAllPermissions(sql)
}

// export async function getPaginatedEmployees(sql, pagination = {}) {
//   const page = pagination?.page ?? 1
//   const perPage = pagination?.perPage ?? 10
//   const totalCount = await countEmployees(sql)
//   const items = await getEmployeesPaginated(sql, { page, perPage })

//   return {
//     pagination: {
//       page: Number(page),
//       perPage: Number(perPage),
//       totalCount: Number(totalCount),
//     },
//     items,
//   }
// }
