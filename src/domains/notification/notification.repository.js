export async function getNotificationById(id, sql) {
  const query = await sql`
    SELECT * FROM notification WHERE id = ${id}
    `
  console.log('getNotificationById', query)
  return query[0]
}
