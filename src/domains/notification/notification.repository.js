export async function getNotificationById(id, sql) {
  const query = await sql`
    SELECT * FROM notification WHERE id = ${id}
    `
  return query[0]
}
