export const timeEntryResolver = {
  Query: {
    timeEntries: async (_, __, { sql }) => {
      console.log('inside time entry call')
      return await sql`SELECT * FROM time_entry`
    },
    // timeEntry: async (parent, { id }, { sql }) => {
    //   console.log('inside timeEntry query')
    //   console.log('id: ', id)

    //   return await sql`SELECT * FROM time_entry WHERE id = id`
    //   //return await sql`SELECT * FROM time_entry WHERE employee_id = id`
    // },
  },
}
