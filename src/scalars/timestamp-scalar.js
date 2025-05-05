import { GraphQLScalarType, Kind } from 'graphql'

export const timestampScalar = new GraphQLScalarType({
  name: 'Time',
  description:
    'The javascript `Date` as integer. Type represents date and time ' +
    'as number of milliseconds from start of UNIX epoch.',

  serialize(msString) {
    return new Date(Number(msString)).toLocaleTimeString('da-DK', {
      hour: '2-digit',
      minute: '2-digit',
    })
  },

  parseValue(dateTimeString) {
    console.log('INSIDE CALCULATE DATE TIME TO UNIX')
    const [date, time] = dateTimeString.split('T')
    const [year, month, day] = date.split('-').map(Number)
    const [hours, minutes] = time.split(':').map(Number)

    console.log(Date.UTC(year, month - 1, day, hours, minutes))
    return Date.UTC(year, month - 1, day, hours, minutes)
  },

  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      const num = parseInt(ast.value, 10)
      return new Date(num)
    } else if (ast.kind === Kind.STRING) {
      return parseDate(ast.value)
    }
    return null
  },
})
