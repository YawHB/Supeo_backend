import { sql } from '../../config/db-config.js'

const DEFAULT_BREAK = parseInt(process.env.PS_DEFAULT_BREAK_MINUTES ?? 30)

export async function findTimeEntryById(id, sql) {
  const rows = await sql`SELECT * FROM time_entry WHERE id = ${id}`
  return rows[0]
}

export async function findAllTimeEntries() {
  return await sql` SELECT * FROM time_entry
  `
}

export async function createTimeEntry(sql, newTimeEntry) {
  const { startTime, endTime, duration, comment, startDate, endDate, employeeID, notification } =
    newTimeEntry

  const { comment: notificationComment, timestamp, status } = notification

  const notificationResultArr =
    await sql`INSERT INTO notification ("comment", "timestamp", "status")
  VALUES(${notificationComment}, ${timestamp}, ${status})
  RETURNING *
  `
  const notificationID = notificationResultArr[0].id
  const notificationResult = notificationResultArr[0]

  const timeEntryResultArr =
    await sql`INSERT INTO time_entry ("start_time", "end_time", "duration", "break", "comment", "start_date", "end_date", "employee_id", "notification_id")
  VALUES(${startTime}, ${endTime}, ${duration}, ${DEFAULT_BREAK}, ${comment}, ${startDate}, ${endDate}, ${employeeID}, ${notificationID})
  RETURNING *
  `

  return {
    ...timeEntryResultArr[0],
    notification: notificationResult,
  }
}

export async function updateTimeEntryStatus(notification, sql) {
  const { status, notificationID, timestamp, comment } = notification
  console.log('notification: ', notification)

  const notificationResultArr = await sql`
    UPDATE notification
    SET status = ${status},
     timestamp = ${timestamp},
     comment = ${comment}
    WHERE id = (
      SELECT notification_id
      FROM time_entry
      WHERE id = ${notificationID}
    )
    RETURNING *;
  `

  const updatedNotification = notificationResultArr[0]
  console.log('updatedNotification', updatedNotification)

  return updatedNotification
}

export async function findOverlappingTimeEntries(employeeID, newStartTime, NewEndTime) {
  return await sql`
  SELECT * FROM time_entry
  WHERE employee_id = ${employeeID}
  AND start_time < ${NewEndTime}
  AND end_time > ${newStartTime}
  `
}
