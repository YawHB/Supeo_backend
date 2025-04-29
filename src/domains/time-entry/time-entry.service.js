import {
  findAllTimeEntries,
  findTimeEntryById,
  updateTimeEntryStatus,
  createTimeEntry,
} from './time-entry.repository.js'

export async function fetchAllTimeEntries(sql) {
  return await findAllTimeEntries(sql)
}

export async function fetchTimeEntryById(id, sql) {
  const result = await findTimeEntryById(id, sql)
  console.log(result)
  return result
}

export async function updateStatus(id, status, sql) {
  const valid = ['PENDING', 'GODKENDT', 'AFVIST']
  if (!valid.includes(status)) throw new Error('Invalid status')
  return await updateTimeEntryStatus(id, status, sql)
}

export async function addNewTimeEntry(sql, newTimeEntry) {
  return await createTimeEntry(sql, newTimeEntry)
}
