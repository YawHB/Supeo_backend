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

  console.log('overlapingTimeEntries: ', overlapingTimeEntries)

  return await createTimeEntry(sql, newTimeEntry)
}

//1. Tjek existing timeEntries
//1.1 I servicelaget, kald en funktion existingTimeEntries() til repo der skal tjekke overlappende tider
//1.2 I repo-laget lav SQL query der returnere et array af alle overlappende vagter
//1.3 I servicelaget, Tjek længden af returværdien fra repo
//1.3a hvis hvis længden er >0 send GQL ERROR og undlad at oprette ny tid
//1.3b ellers send vagt videre til repo-laget og opret som normalt.
