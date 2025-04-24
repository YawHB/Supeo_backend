export const userMenuResolver = {
  Query: {
    userMenuLinks: async (_, { employeeId }, { sql }) => {
      const [employee] = await sql`
        SELECT * FROM employee WHERE id = ${employeeId}
      `

      if (!employee) throw new Error('Employee not found')

      const linksByRole = {
        admin: ['admin', 'employees', 'timeentries'],
        employee: ['employee', 'timeentries'],
      }

      const menuItems = linksByRole[employee.role] || []

      return menuItems.map((item) => ({ menuItem: item }))
    },
  },
}
