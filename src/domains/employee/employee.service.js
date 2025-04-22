import {
  findAllEmployees,
  getAllEmployees,
  findAllEmployeeTimeEntries,
} from './employee.repository.js'

import { getAllEmployees } from './employee.repository.js'
import { getEmployeeById } from './employee.repository.js'
import { createEmployee } from './employee.repository.js'
import { updateEmployee } from './employee.repository.js'

export function getEmployees(sql) {
  return getAllEmployees(sql)
}

export async function fetchEmployee(employeeID, sql) {
  return await findAllEmployees(employeeID, sql)
}

export async function fetchEmployeeTimeEntries(employee, sql) {
  let timeEntries = await findAllEmployeeTimeEntries(employee, sql)

  const prepatedTimeEntries = timeEntries.map((entry) => ({
    ...entry,
    start_time: convertToTime(entry.start_time),
    end_time: convertToTime(entry.end_time),
    duration: convertMinToHour(entry.duration),
  }))

  console.log(prepatedTimeEntries)

  return prepatedTimeEntries
}

function convertToTime(rawDate) {
  console.log('rawDate :', rawDate)
  let stringDate = rawDate.toISOString()
  const [_date, time] = stringDate.split('T')
  const result = time.split('.')[0]
  console.log(result[0])
  return result
}

function convertMinToHour(minutes) {
  return minutes / 60
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
