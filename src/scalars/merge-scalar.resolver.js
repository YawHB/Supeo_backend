import { dateScalar } from './date-scalar.js'
import { timestampScalar } from './timestamp-scalar.js'
import { unixScalar } from './unix-scalar.js'

export const scalaResolver = {
  Date: dateScalar,
  Time: timestampScalar,
  Unix: unixScalar,
}
