export const employeeResolver = {
  Query: {
    employees: async (_parent, __args, { sql }) => {
      console.log('inside usemplyeeer call')
      return await sql`SELECT * FROM employee`
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
      return await sql`SELECT * FROM time_entry WHERE employee_id = ${parent.id} `
    },
  },
}
