import { fetchEmployee, fetchEmployeeTimeEntries, addNewEmployee, editEmployee, getEmployees, getPaginatedEmployees } from './employee.service.js'

export const employeeResolver = {
  Query: {
    employees: async (_, __, { sql }) => {
      return await getEmployees(sql)
    },

    employee: async (_, { id }, { sql }) => {
      return await fetchEmployee(id, sql)
    },

    // employees: async (_, { pagination }, { sql }) => {
    //   const { pagination: pageInfo, items } = await getPaginatedEmployees(sql, pagination)
    //   return {
    //     pagination: {
    //       page: pageInfo.page,
    //       perPage: pageInfo.perPage,
    //       totalCount: pageInfo.totalCount,
    //     },
    //     items,
    //     employees: items,
    //   }
    // },
  },

  Employee: {
    timeEntries: async (parent, _, { sql }) => {
      return await fetchEmployeeTimeEntries(parent, sql)
    },
  },

  Mutation: {
    createEmployee: async (_, { newEmployee }, { sql }) => {
      return await addNewEmployee(sql, newEmployee)
    },

    updateEmployee: async (_, { id, updatedEmployee }, { sql }) => {
      const { firstName, lastName, email, phoneNumber } = updatedEmployee

      const rows = await sql`
    UPDATE employee SET
      first_name = ${firstName},
      last_name = ${lastName},
      email = ${email},
      phone_number = ${phoneNumber}
    WHERE id = ${id}
    RETURNING *
  `

      return rows[0]
    },

    // updateEmployee: async (_, { id, updatedEmployee }, { sql }) =>
    //   await editEmployee(sql, id, updatedEmployee),

    // updateEmployee: async (_, { id, updatedEmployee }, { sql }) => {
    //   return await editEmployee(sql, id, updatedEmployee)
    // }
  },

  PaginationResponse: {
    page: (parent) => parent.page,
    perPage: (parent) => parent.perPage,
    totalCount: (parent) => parent.totalCount,
  },
}
