import { OverlappingTimeEntryExist, WorkHoursAreNegative } from '../../custom-errors.js'
import { hasCorrectOrder } from '../../utils/date-time-helpers.js'

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
  return result
}

export async function updateStatus(notification, sql) {
  return await updateTimeEntryStatus(notification, sql)
}

export async function addNewTimeEntry(sql, newTimeEntry) {
  const { employeeID, startTime, endTime, startDate, endDate } = newTimeEntry
  const datesInOrder = hasCorrectOrder(startDate, endDate)
  const timesInOrder = hasCorrectOrder(startTime, endTime)

  const overlapingTimeEntries = await findOverlappingTimeEntries(employeeID, startTime, endTime)

  if (overlapingTimeEntries.length > 0) throw new OverlappingTimeEntryExist()
  if (!datesInOrder || !timesInOrder) throw new WorkHoursAreNegative()

  return await createTimeEntry(sql, newTimeEntry)
}
