import { GraphQLScalarType, Kind } from 'graphql'

export const dateScala = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scala type',

  //Sender værdier til klienten
  serialize(value) {
    if (value instanceof Date) {
      return value.toLocaleTimeString('da-DK', {
        hour12: false, // bruger 24-timers format
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    }
    // if (value instanceof String) {
    //   return value
    // }
  },

  //Modtager en værdi fra klienten
  parseValue(value) {
    //convert string to date
  },

  //Læser hardcoded værdier direkte fra querien
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      // Convert hard-coded AST string to integer and then to Date
      return new Date(parseInt(ast.value, 10))
    }
    // Invalid hard-coded value (not an integer)
    return null
  },
})
