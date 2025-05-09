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
      return await addNewTimeEntry(sql, newTimeEntry)
    },
    updateTimeEntryStatus: async (_, { notification }, { sql }) => {
      console.log("INSIDE CONTROLLER")
      console.log("notification", notification)
      return await updateStatus( notification, sql)
    },
  },

  TimeEntry: {
    notification: async (parent, _, { sql }) => {
      if (!parent.notification_id) return null
      const result = await sql`
        SELECT * FROM notification WHERE id = ${parent.notification_id}
      `
      return result[0] || null
    },
  },
}
