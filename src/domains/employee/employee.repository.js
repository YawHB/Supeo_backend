import { sql } from '../../db-config.js'

const employeeSortFields = new Set([
  'id',
  'first_name',
  'last_name',
  'email',
  'phone_number',
  'role_name',
  'permission_level',
])

export async function getAllEmployees() {
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

export async function getAllFilteredEmployees(filter, sort) {
  const { whereClause, values } = employeeFilters(filter)
  const orderBy = orderByClauses(sort, 'ORDER BY employee.last_name ASC')

  const query = `
    SELECT
      employee.id,
      employee.first_name,
      employee.last_name,
      employee.email,
      employee.phone_number,
      permission.permission_level,
      role.role_name
    FROM employee
    INNER JOIN permission ON employee.permission_id = permission.id
    INNER JOIN role       ON employee.role_id       = role.id
    ${whereClause}
    ${orderBy}
  `
  return await sql.unsafe(query, values)
}

export async function searchAllEmployees(sql, search) {
  const like = `%${search}%`
  return await sql`
    SELECT
      e.id,
      e.first_name,
      e.last_name,
      e.email,
      e.phone_number,
      r.role_name,
      p.permission_level
    FROM employee e
    INNER JOIN role r        ON e.role_id = r.id
    INNER JOIN permission p  ON e.permission_id = p.id
    WHERE
      e.first_name   ILIKE ${like} OR
      e.last_name    ILIKE ${like} OR
      e.email        ILIKE ${like} OR
      e.phone_number ILIKE ${like} OR
      r.role_name    ILIKE ${like} OR
      p.permission_level ILIKE ${like}
  `
}

export async function countEmployees(sql) {
  const result = await sql`SELECT COUNT(*) FROM employee`
  return Number(result[0].count)
}

export async function getEmployeesPaginated(sql, { page, perPage, search, roles, permissions, sort }) {
  const offset = (page - 1) * perPage
  const { whereClause, values } = whereClauses({ search, roles, permissions })
  const orderBy = orderByClauses(sort, 'ORDER BY employee.last_name ASC')

  const query = `
    SELECT
      employee.id,
      employee.first_name,
      employee.last_name,
      employee.email,
      employee.phone_number,
      role.role_name,
      permission.permission_level
    FROM employee
    INNER JOIN role       ON role.id = employee.role_id
    INNER JOIN permission ON permission.id = employee.permission_id
    ${whereClause}
    ${orderBy}
    LIMIT $${values.length + 1}
    OFFSET $${values.length + 2}
  `
  return await sql.unsafe(query, [...values, perPage, offset])
}

export async function countFilteredEmployees(sql, { search, roles, permissions }) {
  const { whereClause, values } = whereClauses({ search, roles, permissions })
  const query = `
    SELECT COUNT(*) AS count
    FROM employee
    INNER JOIN role       ON role.id = employee.role_id
    INNER JOIN permission ON permission.id = employee.permission_id
    ${whereClause}
  `
  const result = await sql.unsafe(query, values)
  return Number(result[0].count)
}

export function employeeFilters(filter = {}) {
  const clauses = []
  const values = []

  if (filter.roleNames?.length) {
    clauses.push(`role.role_name = ANY($${values.length + 1})`)
    values.push(filter.roleNames)
  }

  if (filter.permissionLevels?.length) {
    clauses.push(`permission.permission_level = ANY($${values.length + 1})`)
    values.push(filter.permissionLevels)
  }

  const whereClause = clauses.length ? `WHERE ${clauses.join(' AND ')}` : ''
  return { whereClause, values }
}

export function whereClauses({ search, roles, permissions }) {
  const conditions = []
  const values = []
  let idx = 1

  if (search) {
    const like = `%${search}%`
    conditions.push(`
      (
        employee.first_name   ILIKE $${idx} OR
        employee.last_name    ILIKE $${idx} OR
        employee.email        ILIKE $${idx} OR
        employee.phone_number ILIKE $${idx} OR
        role.role_name        ILIKE $${idx} OR
        permission.permission_level ILIKE $${idx}
      )
    `)
    values.push(like)
    idx++
  }

  if (roles?.length) {
    conditions.push(`role.role_name = ANY($${idx})`)
    values.push(roles)
    idx++
  }

  if (permissions?.length) {
    conditions.push(`permission.permission_level = ANY($${idx})`)
    values.push(permissions)
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : ''
  return { whereClause, values }
}

export function orderByClauses(sort, fallback = '') {
  if (!sort?.orderBy || !employeeSortFields.has(sort.orderBy)) return fallback

  const mapPrefix = {
    role_name: 'role.',
    permission_level: 'permission.',
  }

  const prefix = mapPrefix[sort.orderBy] || 'employee.'
  const direction = sort.orderDirection === 'DESC' ? 'DESC' : 'ASC'

  return `ORDER BY ${prefix}${sort.orderBy} ${direction}`
}
