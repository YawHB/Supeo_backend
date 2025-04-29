import {
  findAllTimeEntries,
  findTimeEntryById,
  updateTimeEntryStatus,
  createTimeEntry,
} from './time-entry.repository.js'

import { unixTimeToTimestamp, convertUnixToTime } from '../../utils/date-time-helpers.js'

export async function fetchAllTimeEntries(sql) {
  const entries = await findAllTimeEntries(sql)
  return entries.map((entry) => ({
    ...entry,
    startTime: convertUnixToTime(entry.startTime),
    endTime: convertUnixToTime(entry.endTime),
  }))
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
  const { notification } = newTimeEntry
  const { timestamp } = notification
  const convertedTimeEntry = {
    ...newTimeEntry,
    notification: {
      ...notification,
      timestamp: unixTimeToTimestamp(timestamp),
    },
  }

  return await createTimeEntry(sql, convertedTimeEntry)
}
