import { OverlappingTimeEntryExist, WorkHoursAreNegative } from '../../utils/custom-errors.js'
import { hasCorrectOrder } from '../../utils/date-time-helpers.js'
import {
  createTimeEntry,
  findTimeEntryById,
  findAllTimeEntries,
  updateTimeEntryStatus,
  findOverlappingTimeEntries,
  deleteTimeEntryById,
  updateTimeEntryAndResetStatus,
  getNotificationIdByTimeEntryId,
  deleteNotificationById,
  searchAllTimeEntries,
} from './time-entry.repository.js'

export async function fetchTimeEntryById(id, sql) {
  const result = await findTimeEntryById(id, sql)
  return result
}

export async function fetchAllTimeEntries(sql) {
  return await findAllTimeEntries(sql)
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

export async function removeTimeEntry(id, sql) {
  return await sql.begin(async (tx) => {
    const notificationId = await getNotificationIdByTimeEntryId(id, tx)

    const deletedTimeEntry = await deleteTimeEntryById(id, tx)

    if (!deletedTimeEntry) {
      throw new Error(`Time entry with id ${id} does not exist`)
    }

    if (notificationId) {
      await deleteNotificationById(notificationId, tx)
    }

    return deletedTimeEntry.id
  })
}

export async function updateTimeEntry(sql, timeEntryID, updatedTimeEntry) {
  const { employeeID, startTime, endTime, startDate, endDate } = updatedTimeEntry
  const datesInOrder = hasCorrectOrder(startDate, endDate)
  const timesInOrder = hasCorrectOrder(startTime, endTime)

  const [overlappingTimeEntries] = await findOverlappingTimeEntries(
    employeeID,
    startTime,
    endTime,
    timeEntryID,
  )
  if (overlappingTimeEntries) throw new OverlappingTimeEntryExist()
  if (!datesInOrder || !timesInOrder) throw new WorkHoursAreNegative()

  return await updateTimeEntryAndResetStatus(sql, timeEntryID, updatedTimeEntry)
}

export async function searchTimeEntries(search, sql) {
  return await searchAllTimeEntries(search, sql)
}
