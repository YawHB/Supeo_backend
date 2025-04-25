import { employeeResolver } from '../domains/employee/employee.controller.js'
import { timeEntryResolver } from '../domains/time-entry/time-entry.controller.js'
import { adminResolver } from '../domains/admin/admin.controller.js'
import { scalaResolver } from '../scalars/merge-scalar.resolver.js'
import { mergeResolvers } from '@graphql-tools/merge'
import { userMenuResolver } from '../service/user-menu.resolver.js'

export const resolvers = mergeResolvers([
  employeeResolver,
  adminResolver,
  timeEntryResolver,
  scalaResolver,
  userMenuResolver,
])
