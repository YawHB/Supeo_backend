import {
  validateEmailFormat,
  validateNameParts,
  isValidPhoneNumber,
  capitalize,
} from '../../utils/validation.js'
import {
  UserGroupDoesNotExist,
  PermissionLevelDoesNotExist,
  EmailAlreadyExist,
} from '../../utils/custom-errors.js'
import {
  getAllRoles,
  createEmployee,
  updateEmployee,
  getEmployeeById,
  getAllFilteredEmployees,
  getAllEmployees,
  findRoleIdByName,
  findAllEmployees,
  getAllPermissions,
  findPermissionIdByLevel,
  findAllEmployeeTimeEntries,
  findEmailIfExist,
  searchEmployeesRepo,
  countEmployees,
  getEmployeesPaginated,
  countFilteredEmployees,
} from './employee.repository.js'

export function getEmployees() {
  return getAllEmployees()
}

export async function getFilteredEmployees(filter, sort) {
  return await getAllFilteredEmployees(filter, sort)
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
  const { firstName, lastName, roleName, permissionLevel, email, phoneNumber } = employee

  const [formattedFirstName, formattedLastName] = capitalize(validateNameParts(firstName, lastName))
  validateEmailFormat(email)
  await ensureEmailIsUnique(email)
  isValidPhoneNumber(phoneNumber)
  const role = await ensureRoleExists(roleName)
  const permission = await permissionLevelExist(permissionLevel)

  const newEmployee = {
    ...employee,
    firstName: formattedFirstName,
    lastName: formattedLastName,
  }

  return await createEmployee(newEmployee, role.id, permission.id)
}

export async function editEmployee(employee, id) {
  const { firstName, lastName, roleName, permissionLevel, email, phoneNumber } = employee

  const [formattedFirstName, formattedLastName] = capitalize(validateNameParts(firstName, lastName))
  validateEmailFormat(email)
  await ensureEmailIsUnique(email, id)
  isValidPhoneNumber(phoneNumber)
  const role = await ensureRoleExists(roleName)
  const permission = await permissionLevelExist(permissionLevel)

  const newEmployee = {
    ...employee,
    firstName: formattedFirstName,
    lastName: formattedLastName,
  }

  return updateEmployee(newEmployee, id, role.id, permission.id)
}

export async function getRoles(sql) {
  return await getAllRoles(sql)
}

export async function getPermissions(sql) {
  return await getAllPermissions(sql)
}

async function ensureEmailIsUnique(email, employeeID) {
  let [emailExist] = await findEmailIfExist(email, employeeID)
  if (emailExist) throw new EmailAlreadyExist()
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

export async function searchEmployees(search, sql) {
  return await searchEmployeesRepo(search, sql)
}

export async function getPaginatedEmployees(
  sql,
  { pagination = {}, search, roles, permissions, sort },
) {
  const page = pagination?.page ?? 1
  const perPage = pagination?.perPage ?? 10

  const [totalCount, employees] = await Promise.all([
    countFilteredEmployees(sql, { search, roles, permissions }),
    getEmployeesPaginated(sql, { page, perPage, search, roles, permissions, sort }),
  ])

  return {
    pagination: {
      page: Number(page),
      perPage: Number(perPage),
      totalCount: Number(totalCount),
    },
    employees,
  }
}
