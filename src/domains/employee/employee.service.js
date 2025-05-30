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
  InCorrectEmailOrPassword,
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
  findEmployeeByEmail,
  findRoleByEmployeeRoleID,
  findPermissionByEmployeePermissionID,
} from './employee.repository.js'

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

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
  const { firstName, lastName, roleName, permissionLevel, email, phoneNumber, password } = employee

  const [formattedFirstName, formattedLastName] = capitalize(validateNameParts(firstName, lastName))
  validateEmailFormat(email)
  const hashedPassword = await bcrypt.hash(password, 10)

  await ensureEmailIsUnique(email)
  isValidPhoneNumber(phoneNumber)
  const role = await ensureRoleExists(roleName)
  const permission = await permissionLevelExist(permissionLevel)

  const newEmployee = {
    ...employee,
    firstName: formattedFirstName,
    lastName: formattedLastName,
    password: hashedPassword,
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

export async function authenticateEmployee(email, password) {
  const employee = await findEmployeeByEmail(email)
  if (!employee) throw new InCorrectEmailOrPassword(email)

  const role = await findRoleByEmployeeRoleID(employee.role_id)
  const permission = await findPermissionByEmployeePermissionID(employee.permission_id)

  const validPassword = await isPasswordValid(password, employee.password)
  if (!validPassword) throw new InCorrectEmailOrPassword()

  const token = jwt.sign(
    {
      employee_id: employee.id,
      email: employee.email,
      roleName: role.role_name,
      permissionLevel: permission.permission_level,
    },
    process.env.JWT_SECRET,
    { expiresIn: '2h' },
  )
  employee.token = token
  return employee
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

async function isPasswordValid(inputPassword, storedHashedPassword) {
  return bcrypt.compare(inputPassword, storedHashedPassword)
}
