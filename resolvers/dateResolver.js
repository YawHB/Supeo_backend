import { dateScala } from '../src/scalas/Date.scalar.js'
import { TimestampType } from '../src/scalas/TimeStamp.scalar.js'
export const scalaResolvers = {
  Date: dateScala,
  MyTimeStamp: TimestampType,
}
