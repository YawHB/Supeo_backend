export async function getAllEmployees(sql) {
  return await sql`SELECT * FROM employee`
}

export async function findAllEmployees(employeeID, sql) {
  const rows = await sql`SELECT * FROM employee WHERE id = ${employeeID}`
  return rows[0]
}

export async function findAllEmployeeTimeEntries(employee, sql) {
  return await sql`SELECT * FROM time_entry WHERE employee_id = ${employee.id}`
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

export async function updateEmployee(sql, id, employee) {
  const { firstName, lastName, email, role, phoneNumber } = employee
  const result = await sql`
    UPDATE employee
    SET "first_name" = ${firstName}, "last_name" = ${lastName}, "email" = ${email}, "role" = ${role}, "phone_number" = ${phoneNumber}
    WHERE id = ${id}
    RETURNING *
  `
  return result[0]
}

export async function countEmployees(sql) {
  const [{ count }] = await sql`
    SELECT COUNT(*)::int AS count
    FROM employee
  `;
  return count;
}

export async function getEmployeesPaginated(sql, { page, perPage }) {
  const offset = (page - 1) * perPage;
  return await sql`
    SELECT *
    FROM employee
    LIMIT ${perPage}
    OFFSET ${offset}
  `;
}
