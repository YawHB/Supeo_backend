import {
  getRoles,
  getEmployees,
  getFilteredEmployees,
  fetchEmployee,
  addNewEmployee,
  getPermissions,
  fetchEmployeeTimeEntries,
  editEmployee,
  searchEmployees,
  authenticateEmployee,
  getPaginatedEmployees,
} from './employee.service.js'

import bcrypt from 'bcryptjs'

export const employeeResolver = {
  Query: {
    employees: async (_, { search }, { sql }) => {
      if (search) {
        return await searchEmployees(search, sql)
      }
      return await getEmployees(sql)
    },

    filteredEmployees: async (_, { filter, sort }, { sql }) => {
      return await getFilteredEmployees(filter, sort)
    },

    employee: async (_, { id }, { sql }) => {
      return await fetchEmployee(id, sql)
    },

    roles: async (_, __, { sql }) => {
      return await getRoles(sql)
    },

    permissions: async (_, __, { sql }) => {
      return await getPermissions(sql)
    },

    paginatedEmployees: async (_, { pagination, search, roles, permissions, sort }, { sql }) => {
      const { pagination: pageInfo, employees } = await getPaginatedEmployees(sql, {
        pagination,
        search,
        roles,
        permissions,
        sort,
      })
      return {
        pagination: {
          page: pageInfo.page,
          perPage: pageInfo.perPage,
          totalCount: pageInfo.totalCount,
        },
        employees,
      }
    },
  },

  Employee: {
    timeEntries: async (parent, _, { sql }) => {
      return await fetchEmployeeTimeEntries(parent, sql)
    },
  },

  Mutation: {
    createEmployee: async (_, { newEmployee }) => {
      return await addNewEmployee(newEmployee)
    },

    updateEmployee: async (_, { id, updatedEmployee }) => {
      return await editEmployee(updatedEmployee, id)
    },
    handleEmployeeLogin: async (_, { loginInput }) => {
      const hash = await bcrypt.hash('supeo123', 10)
      const { email, password } = loginInput
      //console.log('mit hash: ', hash)

      return authenticateEmployee(email, password)
    },
  },

  PaginationResponse: {
    page: (parent) => parent.page,
    perPage: (parent) => parent.perPage,
    totalCount: (parent) => parent.totalCount,
  },
}
