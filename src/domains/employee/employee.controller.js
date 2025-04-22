import { fetchEmployee, getEmployees, fetchEmployeeTimeEntries } from './employee.service.js'
import { addNewEmployee } from './employee.service.js'

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

  Mutation: {
    createEmployee: async (_, { newEmployee }, { sql }) => {
      return await addNewEmployee(sql, newEmployee)
    },

    updateEmployee: async (_, { id, updatedEmployee }, { sql }) => {
      const { firstName, lastName, email, role, phoneNumber } = updatedEmployee

      const rows = await sql`
    UPDATE employee SET
      first_name = ${firstName},
      last_name = ${lastName},
      email = ${email},
      role = ${role},
      phone_number = ${phoneNumber}
    WHERE id = ${id}
    RETURNING *
  `

      return rows[0]
    },
  },
}
