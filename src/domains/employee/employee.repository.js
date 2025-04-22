export async function getAllEmployees(sql) {
  return await sql`SELECT * FROM employee`
}

export async function getEmployeeById(sql, id) {
  return await sql`SELECT * FROM employee WHERE id = ${id}`
}

export async function createEmployee(sql, employee) {
  const { firstName, lastName, email, role, phoneNumber } = employee
  const result = await sql`
    INSERT INTO employee ("first_name", "last_name", "email", "role", "phone_number")
    VALUES (${firstName}, ${lastName}, ${email}, ${role}, ${phoneNumber})
    RETURNING *
  `
  return result[0]
}
