import {
  findAllTimeEntries,
  findTimeEntryById,
  updateTimeEntryStatus,
  createTimeEntry,
} from './time-entry.repository.js'

export async function fetchAllTimeEntries(sql) {
  const entries = await findAllTimeEntries(sql)
  return entries.map((entry) => ({
    ...entry,
    startTime: convertUnixToTime(entry.startTime),
    endTime: convertUnixToTime(entry.endTime),
  }))
}

export function convertUnixToTime(msString) {
  const date = new Date(Number(msString))
  const [_, timeWithMs] = date.toISOString().split('T')
  return timeWithMs.split('.')[0]
}

export async function fetchTimeEntryById(id, sql) {
  return await findTimeEntryById(id, sql)
}

export async function updateStatus(id, status, sql) {
  const valid = ['PENDING', 'GODKENDT', 'AFVIST']
  if (!valid.includes(status)) throw new Error('Invalid status')
  return await updateTimeEntryStatus(id, status, sql)
}

export async function addNewTimeEntry(sql, newTimeEntry) {
  return await createTimeEntry(sql, newTimeEntry)
}
