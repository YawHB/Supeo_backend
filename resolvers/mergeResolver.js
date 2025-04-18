import { mergeResolvers } from '@graphql-tools/merge'
import { employeeResolver } from './employee.js'
import { adminResolver } from './admin.js'
import { timeEntryResolver } from './timeEntry.js'
import { scalaResolvers } from './dateResolver.js'

export const resolvers = mergeResolvers([
  employeeResolver,
  adminResolver,
  timeEntryResolver,
  scalaResolvers,
])
