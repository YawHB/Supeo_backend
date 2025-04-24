export async function createTimeEntry(sql, newTimeEntry) {
  const { startTime, endTime, duration, comment, date, employeeID } = newTimeEntry
  const result =
    await sql`INSERT INTO time_entry ("start_time", "end_time", "duration", "comment", "date","employee_id")
    VALUES(${startTime}, ${endTime},${duration},${comment},${date},${employeeID})
    RETURNING *
      `
  return result[0]
}
