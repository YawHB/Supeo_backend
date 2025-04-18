export const employeeResolver = {
  Query: {
    employees: async (_parent, __args, { sql }) => {
      console.log('inside usemplyeeer call')
      return await sql`SELECT * FROM employee`
    },
    employee: async (_parent, { id }, { sql }) => {
      const result = await sql`SELECT * FROM employee WHERE id = ${id}`
      return result[0]
    },
  },

  Employee: {
    timeEntries: async (parent, _args, { sql }) => {
      return await sql`SELECT * FROM time_entry WHERE employee_id = ${parent.id} `
    },
  },
}
