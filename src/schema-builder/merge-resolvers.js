import { employeeResolver } from '../domains/employee/employee.controller'
import { timeEntryResolver } from '../domains/time-entry/time-entry.controller'

const resolvers = mergeResolvers([
  employeeResolver,
  adminResolver,
  timeEntryResolver,
  scalaResolvers,
])
