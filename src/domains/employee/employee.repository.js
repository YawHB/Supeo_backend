import { sql } from '../../db-config.js'

export async function getAllEmployees(sql, sort, filter) {
  const validSortFields = new Set([
    'first_name',
    'last_name',
    'email',
    'role_name',
    'permission_level',
  ])

  const whereClauses = []
  const values = []

  if (filter?.firstName) {
    whereClauses.push(`first_name ILIKE $${values.length + 1}`)
    values.push(`%${filter.firstName}%`)
  }
  if (filter?.lastName) {
    whereClauses.push(`last_name ILIKE $${values.length + 1}`)
    values.push(`%${filter.lastName}%`)
  }
  if (filter?.email) {
    whereClauses.push(`email ILIKE $${values.length + 1}`)
    values.push(`%${filter.email}%`)
  }

  // Ændring: Håndter array af rolle-navne
  if (filter?.roleNames && filter.roleNames.length > 0) {
    const rolePlaceholders = filter.roleNames.map((_, i) => `$${values.length + i + 1}`).join(', ')
    whereClauses.push(`role_name IN (${rolePlaceholders})`)
    values.push(...filter.roleNames)
  }

  // Ændring: Håndter array af permissions
  if (filter?.permissionLevels && filter.permissionLevels.length > 0) {
    const permissionPlaceholders = filter.permissionLevels
      .map((_, i) => `$${values.length + i + 1}`)
      .join(', ')
    whereClauses.push(`permission_level IN (${permissionPlaceholders})`)
    values.push(...filter.permissionLevels)
  }

  let query = `
    SELECT
      employee.id,
      first_name,
      last_name,
      email,
      phone_number,
      permission_level,
      role_name
    FROM employee
    INNER JOIN permission ON employee.permission_id = permission.id
    INNER JOIN role ON employee.role_id = role.id
  `

  if (whereClauses.length > 0) {
    query += ` WHERE ${whereClauses.join(' AND ')}`
  }

  if (sort?.orderBy && validSortFields.has(sort.orderBy)) {
    const direction = sort.orderDirection === 'DESC' ? 'DESC' : 'ASC'
    query += ` ORDER BY ${sort.orderBy} ${direction}`
  }

  const result = await sql.unsafe(query, values)
  return result
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

export async function findEmailIfExist(email, employeeID) {
  if (employeeID) {
    return await sql`SELECT email FROM 
    employee WHERE "email" = ${email}
    AND NOT id = ${employeeID}`
  } else {
    return await sql`SELECT email FROM 
    employee WHERE "email" = ${email}
    `
  }
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
