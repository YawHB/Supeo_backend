export const adminResolver = {
  Query: {
    admins: async (_, __, { sql }) => {
      console.log('inside admin call')
      return await sql`SELECT * FROM admin`
    },
  },
}
