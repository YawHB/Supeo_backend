import { GraphQLScalarType, Kind } from 'graphql'

export const unixScalar = new GraphQLScalarType({
  name: 'Unix',
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

  parseValue(msString) {
    const ms = Number(msString)
    if (Number.isNaN(ms)) return null

    const local = new Date(ms)

    const year = local.getFullYear()
    const month = local.getMonth() + 1
    const day = local.getDate()
    const hours = local.getHours()
    const minutes = local.getMinutes()
    const seconds = local.getSeconds()

    return Date.UTC(year, month - 1, day, hours, minutes, seconds)
  },

  parseLiteral(ast) {},
})
