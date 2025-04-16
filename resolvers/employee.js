export const employeeResolver = {
  Query: {
    employees: async (_, __, { sql }) => {
      console.log('inside usemplyeeer call')
      return await sql`SELECT * FROM employee`
    },
  },
}
