import { GraphQLScalarType, Kind } from 'graphql'

export const timestampScalar = new GraphQLScalarType({
  name: 'Time',
  description:
    'The javascript `Date` as integer. Type represents date and time ' +
    'as number of milliseconds from start of UNIX epoch.',

  serialize(msString) {
    console.log('Enter serialize: ', msString)

    const result = new Date(Number(msString)).toLocaleTimeString('da-DK', {
      hour: '2-digit',
      minute: '2-digit',
    })
    console.log('Exit serialize: ', result)

    return result
  },

  parseValue(value) {
    console.log('Enter parseValue: ', value)
    return convertTimeToTimestamp(value)
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

function convertTimeToTimestamp(timeString) {
  const [hours, minutes] = timeString.split(':').map(Number)
  const now = new Date()
  const utcTimestamp = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes)
  console.log('Exit parseValue: ', utcTimestamp)
  return utcTimestamp
}
