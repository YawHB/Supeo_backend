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
  const { firstName, lastName, email, phoneNumber, roleName, permissionLevel } = employee

  let roleID = await sql` SELECT id FROM role WHERE "role_name" = ${roleName}`
  let permissionID =
    await sql` SELECT id FROM permission WHERE "permission_level" = ${permissionLevel}`

  roleID = roleID[0].id
  permissionID = permissionID[0].id

  console.log('roleID', roleID)
  console.log('permissionID', permissionID)
  const result = await sql`
    INSERT INTO employee ("first_name", "last_name", "email", "phone_number", "role_id", "permission_id")
    VALUES (${firstName}, ${lastName}, ${email}, ${phoneNumber}, ${roleID}, ${permissionID})
    RETURNING *
  `
  console.log('result', result[0])

  const createdEmployee = result[0]
  return {
    ...createdEmployee,
    roleID: roleID,
    permissionID: permissionID,
  }
}

export async function updateEmployee(sql, id, employee) {
  const { firstName, lastName, email, phoneNumber } = employee
  const result = await sql`
    UPDATE employee
    SET "first_name" = ${firstName}, "last_name" = ${lastName}, "email" = ${email},  "phone_number" = ${phoneNumber}
    WHERE id = ${id}
    RETURNING *
  `
  return result[0]
}

export async function getAllRoles(sql) {
  return await sql`SELECT * FROM role`
}

export async function getAllPermissions(sql) {
  return await sql`SELECT * FROM permission`
}

// export async function countEmployees(sql) {
//   const [{ count }] = await sql`
//     SELECT COUNT(*)::int AS count
//     FROM employee
//   `
//   return count
// }

// export async function getEmployeesPaginated(sql, { page, perPage }) {
//   const offset = (page - 1) * perPage
//   return await sql`
//     SELECT *
//     FROM employee
//     LIMIT ${perPage}
//     OFFSET ${offset}
//   `
// }