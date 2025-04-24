export async function createTimeEntry(sql, newTimeEntry) {
  const { startTime, endTime, duration, comment, date, employeeID, notification } = newTimeEntry
  const { comment: notificationComment, timestamp, status } = notification
  console.log('-----------------------------')
  console.log('newTimeEntry in repository: ', newTimeEntry)

  const notificationResultArr =
    await sql`INSERT INTO notification ("comment", "timestamp", "status")
  VALUES(${notificationComment}, ${timestamp}, ${status})
  RETURNING *
  `
  const notificationID = notificationResultArr[0].id
  const notificationResult = notificationResultArr[0]

  //   console.log('notificationResult: ', notificationResult[0])
  //   console.log('notificationID: ', notificationID)
  console.log('-----------------------------')
  const timeEntryResultArr =
    await sql`INSERT INTO time_entry ("start_time", "end_time", "duration", "comment", "date","employee_id", "notification_id")
  VALUES(${startTime}, ${endTime},${duration},${comment},${date},${employeeID}, ${notificationID})
  RETURNING *
  `

  console.log('timeEntryResultArr: ', timeEntryResultArr)
  console.log('-----------------------------')

  return {
    ...timeEntryResultArr[0],
    notification: notificationResult,
  }
  return timeEntryResultArr[0]
}
