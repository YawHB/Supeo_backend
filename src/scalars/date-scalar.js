import { GraphQLScalarType, Kind } from 'graphql'

export const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scala type',

  serialize(value) {
    const isoDate = new Date(value)
    const result = isoDate.toLocaleDateString('da-DK')
    let updatedDate = []
    for(const part of result.split('.')) {
      if (part.length > 1) {
        updatedDate.push(part)
      } else {
        updatedDate.push(part.padStart(2, '0'))
      }
    }
    updatedDate = updatedDate.join('-')
    return updatedDate
  },

  parseValue(value) {
    const numberFromDate = Date.parse(value)
    const isoDate = new Date(numberFromDate)
    return isoDate
  },

  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10))
    }
    return null
  },
})
