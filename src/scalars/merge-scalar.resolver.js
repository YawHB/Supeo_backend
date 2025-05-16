import { dateScalar } from './date-scalar.js'
import { unixScalar } from './unix-scalar.js'
import { timestampScalar } from './timestamp-scalar.js'

export const scalaResolver = {
  Date: dateScalar,
  Unix: unixScalar,
  Time: timestampScalar,
}
