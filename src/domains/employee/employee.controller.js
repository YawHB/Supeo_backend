import { ALL_ROLES, ADMIN_OR_MANAGER, requirePermission } from '../../utils/authHelpers.js'
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
  getEmployeeByID,
} from './employee.service.js'

import bcrypt from 'bcryptjs'

export const employeeResolver = {
  Query: {
    employees: async (_, { search }, { sql, user }) => {
      requirePermission(user, ADMIN_OR_MANAGER)
      if (search) {
        return await searchEmployees(search, sql)
      }
      return await getEmployees(sql)
    },

    employeeByID: async (_, { id }, { user }) => {
      return await getEmployeeByID(id)
    },

    filteredEmployees: async (_, { filter, sort }, { sql, user }) => {
      return await getFilteredEmployees(filter, sort)
    },

    employee: async (_, { id }, { sql, user }) => {
      requirePermission(user, ALL_ROLES)
      return await fetchEmployee(id, sql)
    },

    roles: async (_, __, { sql, user }) => {
      requirePermission(user, ADMIN_OR_MANAGER)
      return await getRoles(sql)
    },

    permissions: async (_, __, { sql, user }) => {
      requirePermission(user, ADMIN_OR_MANAGER)
      return await getPermissions(sql)
    },

    paginatedEmployees: async (
      _,
      { pagination, search, roles, permissions, sort },
      { sql, user },
    ) => {
      requirePermission(user, ADMIN_OR_MANAGER)
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
    timeEntries: async (parent, _, { sql, user }) => {
      requirePermission(user, ALL_ROLES)
      return await fetchEmployeeTimeEntries(parent, sql)
    },
  },

  Mutation: {
    createEmployee: async (_, { newEmployee, user }) => {
      return await addNewEmployee(newEmployee)
    },

    updateEmployee: async (_, { id, updatedEmployee, user }) => {
      return await editEmployee(updatedEmployee, id)
    },
    handleEmployeeLogin: async (_, { loginInput }) => {
      const { email, password } = loginInput

      return authenticateEmployee(email, password)
    },
  },

  PaginationResponse: {
    page: (parent) => parent.page,
    perPage: (parent) => parent.perPage,
    totalCount: (parent) => parent.totalCount,
  },
}
