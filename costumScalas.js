import { GraphQLScalarType, Kind } from 'graphql'

const dateScala = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scala type',
  serialize(value) {
    if (value instanceof Date) {
      return value.getTime()
    }
  },
  parseValue(value) {
    //parse the value from JSON
    return value
  },
  parseLiteral() {
    // Read hardcoded data
  },
})
