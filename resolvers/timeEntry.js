export const timeEntryResolver = {
  Query: {
    timeEntries: async (_, __, { sql }) => {
      console.log('inside time entry call')
      return await sql`SELECT * FROM time_entry`
    },
  },
}
