import { UserGroupDoesNotExist } from '../../custom-errors.js'
import {
  findAllEmployees,
  getAllEmployees,
  findAllEmployeeTimeEntries,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  getAllRoles,
  getAllPermissions,
  roleIdExists,
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

export async function getEmployee(sql, id) {
  return getEmployeeById(sql, id)
}

export async function addNewEmployee(sql, employee) {
  const { roleName, permissionLevel, email } = employee
  console.log('employee: ', employee)

  let roleID = await roleIdExists(roleName)

  if (roleID.length <= 0) throw new UserGroupDoesNotExist()
  return await createEmployee(employee, roleID[0].id)
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
