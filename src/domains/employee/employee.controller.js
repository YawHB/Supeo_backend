import { fetchEmployee, getEmployees, fetchEmployeeTimeEntries } from './employee.service.js'

export const employeeResolver = {
  Query: {
    employees: async (_, __, { sql }) => {
      return await getEmployees(sql)
    },
    employee: async (_, { id }, { sql }) => {
      return await fetchEmployee(id, sql)
    },
  },

  Employee: {
    timeEntries: async (parent, _, { sql }) => {
      return await fetchEmployeeTimeEntries(parent, sql)
    },
  },
}
