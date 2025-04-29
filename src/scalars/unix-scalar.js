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
    console.log('Enter parseValue: ', msString)
    const now = new Date(Number(msString))
    const timestamp = now.toISOString()
    console.log('Exit parseValue: ', timestamp)
    return timestamp
  },

  parseLiteral(ast) {},
})
