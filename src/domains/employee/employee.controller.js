import { getEmployees } from './employee.service.js'
import { addNewEmployee } from './employee.service.js'

export const employeeResolver = {
  Query: {
    employees: async (_, __, { sql }) => {
      console.log('inside usemplyeeer call')
      return getEmployees(sql)
    },

    employee: async (_, { id }, { sql }) => {
      console.log('inside usemplyeeer call')
      const rows = await sql`SELECT * FROM employee where id = ${id}`
      console.log(rows)
      return rows[0]
    },
  },

  Employee: {
    timeEntries: async (parent, { id }, { sql }) => {
      console.log('INSIDE EMPLOYEE.TIMEENTRIES')
      return await sql`SELECT * FROM time_entry WHERE employee_id = ${parent.id}`
    },
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
