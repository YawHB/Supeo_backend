export async function updateTimeEntryStatus(id, status, sql) {
  // Update the status of the notification
  const result = await sql`
    UPDATE notification
    SET status = ${status}
    WHERE id = (
      SELECT notification_id
      FROM time_entry
      WHERE id = ${id}
    )
    RETURNING *;
  `

  // If no result is found, throw an error
  if (result.length === 0) {
    throw new Error('Time entry not found')
  }

  // Retrieve the time entry corresponding to the ID
  const timeEntry = await sql`
    SELECT * FROM time_entry
    WHERE id = ${id}
  `

  // If no time entry found, throw an error
  if (timeEntry.length === 0) {
    throw new Error('Time entry not found')
  }

  // Return the updated time entry
  return timeEntry[0]
}
