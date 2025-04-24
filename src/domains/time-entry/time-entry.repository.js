export async function findTimeEntryById(id, sql) {
  const rows = await sql`SELECT * FROM time_entry WHERE id = ${id}`
  return rows[0]
}

export async function findAllTimeEntries(sql) {
  return await sql`
    SELECT 
      te.id,
      te.start_time   AS "startTime",
      te.end_time     AS "endTime",
      te.duration     AS "duration",
      te.comment      AS "comment",
      te.date         AS "date",
      n.status        AS "status",
      e.first_name    AS "firstName",
      e.last_name     AS "lastName"
    FROM time_entry te
    JOIN notification n ON te.notification_id = n.id
    JOIN employee e     ON te.employee_id     = e.id
  `
}

export async function updateTimeEntryStatus(id, status, sql) {
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
  if (result.length === 0) {
    throw new Error('Time entry not found')
  }

  const timeEntry = await sql`
    SELECT * FROM time_entry
    WHERE id = ${id}
  `

  if (timeEntry.length === 0) {
    throw new Error('Time entry not found')
  }

  return timeEntry[0]
}
