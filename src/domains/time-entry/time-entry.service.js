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

export async function updateStatus(notification, sql) {
  console.log('INSIDE SERVICE')
  console.log('notification', notification)
  const valid = ['AFVENTER', 'GODKENDT', 'AFVIST']
  if (!valid.includes(notification)) throw new Error('Invalid status')
  return await updateTimeEntryStatus(notification, sql)
}

export async function addNewTimeEntry(sql, newTimeEntry) {
  return await createTimeEntry(sql, newTimeEntry)
}
