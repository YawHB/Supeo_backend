import {
  findAllEmployees,
  getAllEmployees,
  findAllEmployeeTimeEntries,
  getEmployeeById,
  createEmployee,
  updateEmployee,
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

export function getEmployee(sql, id) {
  return getEmployeeById(sql, id)
}

export function addNewEmployee(sql, employee) {
  return createEmployee(sql, employee)
}

export function editEmployee(sql, id, employee) {
  return updateEmployee(sql, id, employee)
}
