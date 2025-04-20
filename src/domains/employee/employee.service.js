import { getAllEmployees } from './employee.repository.js'
export function getEmployees(sql) {
  return getAllEmployees(sql)
}
