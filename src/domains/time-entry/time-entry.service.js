import { networkInterfaces } from 'os'
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
  console.log('Inside add new time entry -- service')
  console.log(newTimeEntry)
  const { date, startTime, endTime, notification } = newTimeEntry
  const { timestamp } = notification
  console.log('notification: ', timestamp)
  const convertedTimeEntry = {
    ...newTimeEntry,
    startTime: unixTimeToTimestamp(combineDateAndTimeToUnixTime(date, startTime)),
    endTime: unixTimeToTimestamp(combineDateAndTimeToUnixTime(date, endTime)),
    notification: {
      ...notification,
      timestamp: unixTimeToTimestamp(timestamp),
    },
  }
  console.log('-----------------hallloo-----------------------')
  console.log('convertedTimeEntry: ', convertedTimeEntry)
  return await createTimeEntry(sql, convertedTimeEntry)
}

function combineDateAndTimeToUnixTime(currentDate, time) {
  const tempDate = currentDate
  const stringDate = tempDate.toISOString()
  const [date] = stringDate.split('T')
  const dateToParse = `${date} ${time}`
  const unixTimestamp = Date.parse(dateToParse)

  return unixTimestamp
  //---------------
}
function unixTimeToTimestamp(unixTime) {
  unixTime = Number(unixTime)
  const timestamp = new Date(unixTime).toISOString()
  console.log('timestamp: ', timestamp)
  return timestamp
}
