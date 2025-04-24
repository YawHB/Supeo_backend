import timeEntryService from './time-entry.service.js'

export const timeEntryResolver = {
  Query: {
    timeEntries: async (_, __, { sql }) => {
      return await sql`SELECT * FROM time_entry`
    },

    timeEntry: async (_parent, { id }, { sql }) => {
      const timeEntry = await sql`SELECT * FROM time_entry WHERE id = ${id}`
      return timeEntry[0]
    },
  },

  Mutation: {
    updateTimeEntryStatus: async (_, { id, status }, { sql }) => {
      return timeEntryService.updateStatus(id, status, sql)
    },
  },
}
