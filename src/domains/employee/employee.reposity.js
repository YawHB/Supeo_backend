export async function getAllEmployees() {
  return await sql`SELECT * FROM employee`
}
