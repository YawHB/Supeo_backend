import { GraphQLScalarType, Kind } from 'graphql'

export const TimestampType = new GraphQLScalarType({
  name: 'MyTimeStamp',
  description:
    'The javascript `Date` as integer. Type represents date and time ' +
    'as number of milliseconds from start of UNIX epoch.',

  serializeDate(date) {
    // if (value instanceof Date) {
    //   return value.getTime()
    // } else if (typeof value === 'number') {
    //   return Math.trunc(value)
    // } else if (typeof value === 'string') {
    //   return Date.parse(value)
    // }
    // return null

    let tempTime = date.split(':')
    let dt = new Date()
    dt.setHours(tempTime[0])
    dt.setMinutes(tempTime[1])
    dt.setSeconds(tempTime[2])
    return dt
  },

  parseDate(value) {
    if (value === null) {
      return null
    }

    try {
      return new Date(value)
    } catch (err) {
      return null
    }
  },

  parseDateFromLiteral(ast) {
    if (ast.kind === Kind.INT) {
      const num = parseInt(ast.value, 10)
      return new Date(num)
    } else if (ast.kind === Kind.STRING) {
      return parseDate(ast.value)
    }
    return null
  },
})
