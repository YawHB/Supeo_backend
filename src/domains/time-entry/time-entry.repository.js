const DEFAULT_BREAK = parseInt(process.env.PS_DEFAULT_BREAK_MINUTES ?? 30)

export async function findTimeEntryById(id, sql) {
  const rows = await sql`SELECT * FROM time_entry WHERE id = ${id}`
  return rows[0]
}

export async function findAllTimeEntries(sql) {
  return await sql`
  SELECT 
  te.id,
  te.start_time,
  te.end_time,
  te.duration,
  te.comment,
  te.start_date,
  te.end_date,
  n.status,
  e.first_name,
  e.last_name
FROM time_entry te
JOIN notification n ON te.notification_id = n.id
JOIN employee e     ON te.employee_id     = e.id

  `
}

export async function updateTimeEntryStatus({ notification }, sql) {
  console.log('inside time-entry repository')
  console.log('notification', notification)
  const updatedNotification = await sql`
    UPDATE notification
    SET status = ${notification.status}
    WHERE id = (
      SELECT notification_id
      FROM time_entry
      WHERE id = ${notification}
    )
    RETURNING *;
  `
  console.log('updatedNotification', updatedNotification)
  if (notification.length === 0) {
    throw new Error('Time entry not found')
  }

  const timeEntry = await sql`
    SELECT * FROM time_entry
    WHERE id = ${notification}
  `

  if (timeEntry.length === 0) {
    throw new Error('Time entry not found')
  }

  console.log('timeEntry', timeEntry)
  return {
    notification: updatedNotification[0],
  }
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
  VALUES(${startTime}, ${endTime}, ${duration}, ${DEFAULT_BREAK},  ${comment}, ${startDate}, ${endDate}, ${employeeID}, ${notificationID})
  RETURNING *
  `

  return {
    ...timeEntryResultArr[0],
    notification: notificationResult,
  }
}
