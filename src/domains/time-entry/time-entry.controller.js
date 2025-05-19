import { getEmployee } from '../employee/employee.service.js'
import {
  updateStatus,
  addNewTimeEntry,
  fetchTimeEntryById,
  fetchAllTimeEntries,
  removeTimeEntry,
  updateTimeEntry,
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
      return await updateStatus(notification, sql)
    },
    deleteTimeEntry: async (_, { id }, { sql }) => {
      return await removeTimeEntry(id, sql)
    },
    updateTimeEntry: async (_, { id, updatedTimeEntry }, { sql }) => {
      return await updateTimeEntry(sql, id, updatedTimeEntry)
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
    employee: async (parent, _, __) => {
      return await getEmployee(parent.employee_id)
    },
  },
}
