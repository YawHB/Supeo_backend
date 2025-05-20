import { sql } from '../../db-config.js'

export async function getAllEmployees(sql) {
  return await sql`
  SELECT employee.id, first_name, last_name, email, phone_number, permission_level, role_name
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

export async function getEmployeeById(employeeID) {
  const resultArr = await sql`SELECT * FROM employee WHERE id = ${employeeID}`
  return resultArr[0]
}

export async function createEmployee(employee, roleID, permissionID) {
  const { firstName, lastName, email, phoneNumber } = employee

  const newEmployeeIDEesult = await sql`
    INSERT INTO employee ("first_name", "last_name", "email", "phone_number", "role_id", "permission_id")
    VALUES (${firstName}, ${lastName}, ${email}, ${phoneNumber}, ${roleID}, ${permissionID})
    RETURNING id
    `
  const newEmployeeID = newEmployeeIDEesult[0].id

  const employeeWithRoleAndPermission = await sql`
    SELECT employee.id, first_name, last_name, email, phone_number, permission_level, role_name 
    FROM employee
    INNER JOIN permission ON employee.permission_id = permission.id
    INNER JOIN role ON employee.role_id = role.id
    WHERE employee.id = ${newEmployeeID}
    `
  const newEmployee = employeeWithRoleAndPermission[0]
  return newEmployee
}

export async function updateEmployee(employee, employeeID, roleID, permissionID) {
  const { firstName, lastName, email, phoneNumber } = employee

  await sql` UPDATE employee
  SET
      first_name = ${firstName},
      last_name = ${lastName},
      email = ${email},
      phone_number = ${phoneNumber},
      role_id =  ${roleID},
      permission_id =${permissionID}
    WHERE id = ${employeeID}

 
  `
  const updatedEmployee = await sql`
    SELECT
      employee.id,
      employee.first_name,
      employee.last_name,
      employee.email,
      employee.phone_number,
      role.role_name,
      permission.permission_level
    FROM employee
    INNER JOIN role ON role.id = employee.role_id
    INNER JOIN permission ON permission.id = employee.permission_id
    WHERE employee.id = ${employeeID}
  `
  return updatedEmployee[0]
}

export async function getAllRoles(sql) {
  return await sql`SELECT * FROM role`
}

export async function getAllPermissions(sql) {
  return await sql`SELECT * FROM permission`
}

export async function findRoleIdByName(roleName) {
  return await sql` SELECT id FROM role WHERE "role_name" = ${roleName}`
}

export async function findPermissionIdByLevel(permissionLevel) {
  return await sql`SELECT id FROM permission WHERE "permission_level" = ${permissionLevel}`
}

export async function findEmailIfExist(email) {
  return await sql`SELECT email FROM employee WHERE "email" = ${email}`
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
