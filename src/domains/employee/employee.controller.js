import {
  getRoles,
  getEmployees,
  getFilteredEmployees,
  fetchEmployee,
  addNewEmployee,
  getPermissions,
  fetchEmployeeTimeEntries,
  editEmployee,
  //getPaginatedEmployees,
} from './employee.service.js'

export const employeeResolver = {
  Query: {
    employees: async () => {
      return await getEmployees()
    },
    
    filteredEmployees: async (_, { filter }, { search }) => {
      return await getFilteredEmployees(filter, search)
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
      return await addNewEmployee(newEmployee)
    },

    updateEmployee: async (_, { id, updatedEmployee }) => {
      return await editEmployee(updatedEmployee, id)
    },
  },

  // PaginationResponse: {
  //   page: (parent) => parent.page,
  //   perPage: (parent) => parent.perPage,
  //   totalCount: (parent) => parent.totalCount,
  // },
}
