import { sql } from '../../db-config.js'

const DEFAULT_BREAK = parseInt(process.env.PS_DEFAULT_BREAK_MINUTES ?? 30)

const validSortFields = [
  'start_date',
  'start_time',
  'end_date',
  'end_time',
  'duration',
  'break',
  'comment',
  'status',
]

export async function findTimeEntryById(id, sql) {
  const rows = await sql`SELECT * FROM time_entry WHERE id = ${id}`
  return rows[0]
}

export async function findAllTimeEntries() {
  const rows = await sql`SELECT * FROM time_entry`
  return rows
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

  const notificationResultArr = await sql`
    UPDATE notification
    SET status = ${status}, timestamp = ${timestamp}, comment = ${comment}
    WHERE id = (
      SELECT notification_id
      FROM time_entry
      WHERE id = ${notificationID}
    )
    RETURNING *;
  `
  const updatedNotification = notificationResultArr[0]

  return updatedNotification
}

export async function findOverlappingTimeEntries(
  employeeID,
  newStartTime,
  NewEndTime,
  timeEntryID,
) {
  if (!timeEntryID) {
    const result = await sql`
    SELECT *
    FROM time_entry
    WHERE employee_id = ${employeeID}
    AND start_time < ${NewEndTime}
    AND end_time > ${newStartTime}
    `
    return result
  } else {
    const result = await sql`
    SELECT *
    FROM time_entry
    WHERE employee_id = ${employeeID}
    AND start_time < ${NewEndTime}
    AND end_time > ${newStartTime}
    AND NOT id = ${timeEntryID}
    `
    return result
  }
}

export async function deleteTimeEntryById(id, sql) {
  const deletedTimeEntry = await sql`
    DELETE FROM time_entry WHERE id = ${id}
    RETURNING id
  `
  return deletedTimeEntry[0]
}

// export async function updateTimeEntryAndResetStatus(sql, id, updatedTimeEntry) {
//   const { startTime, endTime, duration, comment, startDate, endDate, employeeID } = updatedTimeEntry

//   const timeEntryResultArr = await sql`
//     UPDATE time_entry
//     SET
//       start_time = ${startTime},
//       end_time = ${endTime},
//       duration = ${duration},
//       comment = ${comment},
//       start_date = ${startDate},
//       end_date = ${endDate},
//       employee_id = ${employeeID}
//     WHERE id = ${id}
//     RETURNING *
//   `

//   const timeEntry = timeEntryResultArr[0]

//   const notificationResultArr = await sql`
//     UPDATE notification
//     SET status = 'AFVENTER'
//     WHERE id = ${timeEntry.notification_id}
//     RETURNING *
//   `

//   const updatedNotification = notificationResultArr[0]

//   return {
//     ...timeEntry,
//     notification: updatedNotification,
//   }
// }

export async function updateTimeEntryAndResetStatus(sql, id, updatedTimeEntry) {
  const { startTime, endTime, duration, comment, startDate, endDate, employeeID, notification } =
    updatedTimeEntry

  const timeEntryResultArr = await sql`
    UPDATE time_entry
    SET 
      start_time = ${startTime},
      end_time = ${endTime},
      duration = ${duration},
      comment = ${comment},
      start_date = ${startDate},
      end_date = ${endDate},
      employee_id = ${employeeID}
    WHERE id = ${id}
    RETURNING *
  `

  const timeEntry = timeEntryResultArr[0]

  if (notification) {
    const { status, comment, timestamp } = notification

    const notificationResultArr = await sql`
      UPDATE notification
      SET 
        status = ${status},
        comment = ${comment},
        timestamp = ${timestamp}
      WHERE id = ${timeEntry.notification_id}
      RETURNING *
    `

    const updatedNotification = notificationResultArr[0]

    return {
      ...timeEntry,
      notification: updatedNotification,
    }
  } else {
    // fallback to fetching existing notification
    const notificationArr = await sql`
      SELECT * FROM notification WHERE id = ${timeEntry.notification_id}
    `
    return {
      ...timeEntry,
      notification: notificationArr[0] ?? null,
    }
  }
}

export async function getNotificationIdByTimeEntryId(id, sql) {
  const result = await sql`
    SELECT notification_id FROM time_entry WHERE id = ${id}
  `
  return result[0]?.notification_id || null
}

export async function deleteNotificationById(notificationId, sql) {
  await sql`
    DELETE FROM notification WHERE id = ${notificationId}
  `
}

export async function searchAllTimeEntries(search, sql) {
  const like = `%${search}%`
  return await sql`
    SELECT
      t.id,
      t.start_time,
      t.end_time,
      t.duration,
      t.comment,
      t.start_date,
      t.end_date,
      t.break,
      e.id AS employee_id,
      e.first_name,
      e.last_name,
      e.email,
      e.phone_number,
      r.role_name,
      p.permission_level,
      n.id AS notification_id,
      n.comment AS notification_comment,
      n.timestamp,
      n.status
    FROM time_entry t
    LEFT JOIN employee e      ON t.employee_id = e.id
    LEFT JOIN role r          ON e.role_id = r.id
    LEFT JOIN permission p    ON e.permission_id = p.id
    LEFT JOIN notification n  ON t.notification_id = n.id
    WHERE
      t.start_time::text ILIKE ${like} OR
      t.end_time::text ILIKE ${like} OR
      t.comment ILIKE ${like} OR
      t.duration::text ILIKE ${like} OR
      t.break::text ILIKE ${like} OR
      e.first_name ILIKE ${like} OR
      e.last_name ILIKE ${like} OR
      e.email ILIKE ${like} OR
      e.phone_number ILIKE ${like} OR
      r.role_name ILIKE ${like} OR
      p.permission_level ILIKE ${like} OR
      n.comment ILIKE ${like} OR
      n.status::text ILIKE ${like}
  `
}

export async function searchTimeEntriesByEmployee(employeeId, search) {
  const like = `%${search}%`
  return await sql`
    SELECT
      t.id,
      t.start_time,
      t.end_time,
      t.duration,
      t.comment,
      t.start_date,
      t.end_date,
      t.break,
      n.id AS notification_id,
      n.comment AS notification_comment,
      n.timestamp,
      n.status
    FROM time_entry t
    LEFT JOIN notification n ON t.notification_id = n.id
    WHERE t.employee_id = ${employeeId}
      AND (
        t.start_time::text ILIKE ${like} OR
        t.end_time::text ILIKE ${like} OR
        t.comment ILIKE ${like} OR
        t.duration::text ILIKE ${like} OR
        t.break::text ILIKE ${like} OR
        n.comment ILIKE ${like} OR
        n.status::text ILIKE ${like}
      )
  `
}

export async function findTimeEntriesByEmployee(employeeId, sort) {

  let orderBy = 't.start_date'
  let orderDirection = 'ASC'

  if (sort) {
    const field = sort.orderBy
    const direction = sort.orderDirection

    if (validSortFields.includes(field)) {
      orderBy = `t.${field}`
    }

    if (direction === 'ASC' || direction === 'DESC') {
      orderDirection = direction
    }
  }

  const query = `
    SELECT
      t.id,
      t.start_time,
      t.end_time,
      t.duration,
      t.comment,
      t.start_date,
      t.end_date,
      t.break,
      n.id AS notification_id,
      n.comment AS notification_comment,
      n.timestamp,
      n.status
    FROM time_entry t
    LEFT JOIN notification n ON t.notification_id = n.id
    WHERE t.employee_id = $1
    ORDER BY ${orderBy} ${orderDirection}
  `
  const rows = await sql.unsafe(query, [employeeId])
  return rows
}
