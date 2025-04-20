export async function getAllEmployees(sql) {
  return await sql`SELECT * FROM employee`
}
