import { createTimeEntry } from './time-entry.repository.js'

export async function addNewTimeEntry(sql, newTimeEntry) {
  return await createTimeEntry(sql, newTimeEntry)
}
