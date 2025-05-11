import { OverlappingTimeEntryExist } from '../../custom-errors.js'

import {
  findAllTimeEntries,
  findTimeEntryById,
  updateTimeEntryStatus,
  createTimeEntry,
  findOverlappingTimeEntries,
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
  const { employeeID, startTime, endTime } = newTimeEntry

  const overlapingTimeEntries = await findOverlappingTimeEntries(employeeID, startTime, endTime)

  if (overlapingTimeEntries.length > 0) {
    throw new OverlappingTimeEntryExist()
  }

  return await createTimeEntry(sql, newTimeEntry)
}
