import {
  fetchAllTimeEntries,
  fetchTimeEntryById,
  updateStatus,
  addNewTimeEntry,
} from './time-entry.service.js'

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
    createTimeEntry: async (_, { newTimeEntry }, { sql }) => {
      console.log('newTimeEntry object in Mutation resolver: ', newTimeEntry)
      return await addNewTimeEntry(sql, newTimeEntry)
    },
    updateTimeEntryStatus: async (_, { id, status }, { sql }) => {
      return await updateStatus(id, status, sql)
    },
  },
}
