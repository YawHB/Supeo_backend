import { GraphQLScalarType, Kind } from 'graphql'

export const timestampScalar = new GraphQLScalarType({
  name: 'Time',
  description:
    'The javascript `Date` as integer. Type represents date and time ' +
    'as number of milliseconds from start of UNIX epoch.',

  serialize(msString) {
    let time = new Date(Number(msString)).toLocaleTimeString('da-DK', {
      hour: '2-digit',
      minute: '2-digit',
    })
    time = time.replace('.', ':')
    return time
  },

  parseValue(dateTimeString) {
    if (!dateTimeString || typeof dateTimeString !== 'string') return null

    const [date, time] = dateTimeString.split(' ')
    if (!date || !time) return null

    const [year, month, day] = date.split('-').map(Number)
    const [hours, minutes] = time.split(':').map(Number)

    if (
      Number.isNaN(year) ||
      Number.isNaN(month) ||
      Number.isNaN(day) ||
      Number.isNaN(hours) ||
      Number.isNaN(minutes)
    ) {
      console.warn('Invalid date/time parts:', { year, month, day, hours, minutes })
      return null
    }

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
