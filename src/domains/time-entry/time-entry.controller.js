import { fetchAllTimeEntries, fetchTimeEntryById, updateStatus } from './time-entry.service.js'

export const timeEntryResolver = {
  Query: {
    timeEntries: async (_, __, { sql }) => {
      return await fetchAllTimeEntries(sql)
    },
    timeEntry: async (_, { id }, { sql }) => {
      return await fetchTimeEntryById(id, sql)
    },
  },
  Mutation: {
    updateTimeEntryStatus: async (_, { id, status }, { sql }) => {
      return await updateStatus(id, status, sql)
    },
  },
}
