export async function getAllEmployees(sql) {
  return await sql` SELECT employee.id ,first_name, last_name,email,phone_number, permission_level, role_name
FROM employee
INNER JOIN permission ON employee.permission_id = permission.id
INNER JOIN role ON employee.role_id = role.id
 `
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

  const newEmployeeIDEesult = await sql`
    INSERT INTO employee ("first_name", "last_name", "email", "phone_number", "role_id", "permission_id")
    VALUES (${firstName}, ${lastName}, ${email}, ${phoneNumber}, ${roleID}, ${permissionID})
    RETURNING id
    `
  const newEmployeeID = newEmployeeIDEesult[0].id
  const employeeWithRoleAndPermission = await sql`
    SELECT employee.id ,first_name , last_name ,email,phone_number , permission_level, role_name 
    FROM employee
    INNER JOIN permission ON employee.permission_id = permission.id
    INNER JOIN role ON employee.role_id = role.id
    WHERE employee.id = ${newEmployeeID}
    `
  const newEmployee = employeeWithRoleAndPermission[0]
  return newEmployee
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
