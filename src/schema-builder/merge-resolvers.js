import { mergeResolvers } from '@graphql-tools/merge'
import { userMenuResolver } from '../utils/user-menu.resolver.js'
import { scalaResolver } from '../scalars/merge-scalar.resolver.js'
import { employeeResolver } from '../domains/employee/employee.controller.js'
import { timeEntryResolver } from '../domains/time-entry/time-entry.controller.js'
import { notificationResolver } from '../domains/notification/notification.controller.js'

export const resolvers = mergeResolvers([
  scalaResolver,
  employeeResolver,
  userMenuResolver,
  timeEntryResolver,
  notificationResolver,
])
