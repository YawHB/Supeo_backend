import { validate } from 'graphql'
import {
  UserGroupDoesNotExist,
  PermissionLevelDoesNotExist,
  EmailAlreadyExist,
  InvalidEmailFormat,
} from '../../utils/custom-errors.js'
import {
  getAllRoles,
  createEmployee,
  updateEmployee,
  getEmployeeById,
  getAllEmployees,
  findRoleIdByName,
  findAllEmployees,
  getAllPermissions,
  findPermissionIdByLevel,
  findAllEmployeeTimeEntries,
  findEmailIfExist,
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

  validateEmailFormat(email)
  await ensureEmailIsUnique(email)
  const role = await ensureRoleExists(roleName)
  const permission = await permissionLevelExist(permissionLevel)

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

async function ensureEmailIsUnique(email) {
  let [emailExist] = await findEmailIfExist(email)
  if (emailExist) throw new EmailAlreadyExist()
}

function validateEmailFormat(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(email)) throw new InvalidEmailFormat()
}

async function ensureRoleExists(roleName) {
  let [role] = await findRoleIdByName(roleName)
  if (!role) throw new UserGroupDoesNotExist()
  return role
}
async function permissionLevelExist(permissionLevel) {
  let [permission] = await findPermissionIdByLevel(permissionLevel)
  if (!permission) throw new PermissionLevelDoesNotExist()
  return permission
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
