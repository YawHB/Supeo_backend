import {
  findAllTimeEntries,
  findTimeEntryById,
  updateTimeEntryStatus,
  createTimeEntry,
} from './time-entry.repository.js'

import {
  combineDateAndTimeToUnixTime,
  unixTimeToTimestamp,
  convertUnixToTime,
} from '../../utils/date-time-helpers.js'

export async function fetchAllTimeEntries(sql) {
  const entries = await findAllTimeEntries(sql)
  return entries.map((entry) => ({
    ...entry,
    startTime: convertUnixToTime(entry.startTime),
    endTime: convertUnixToTime(entry.endTime),
  }))
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
  const { date, startTime, endTime, notification } = newTimeEntry
  const { timestamp } = notification
  const convertedTimeEntry = {
    ...newTimeEntry,
    startTime: unixTimeToTimestamp(combineDateAndTimeToUnixTime(date, startTime)),
    endTime: unixTimeToTimestamp(combineDateAndTimeToUnixTime(date, endTime)),
    notification: {
      ...notification,
      timestamp: unixTimeToTimestamp(timestamp),
    },
  }

  return await createTimeEntry(sql, convertedTimeEntry)
}
