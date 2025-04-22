import { getAllEmployees } from './employee.repository.js'
import { getEmployeeById } from './employee.repository.js'
import { createEmployee } from './employee.repository.js'

export function getEmployees(sql) {
  return getAllEmployees(sql)
}

export function getEmployee(sql, id) {
  return getEmployeeById(sql, id)
}

export function addNewEmployee(sql, employee) {
  return createEmployee(sql, employee)
}

