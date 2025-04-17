import { GraphQLScalarType, Kind } from 'graphql'

const dateScala = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scala type',

  //Sender værdier til klienten
  serialize(value) {
    // if (value instanceof Date) {
    //   return value.getTime()
    // }¨
    return dateToString(value)
  },
  //Modtager en værdi fra klienten
  parseValue(value) {
    return stringToDate(value)
  },

  //Læser hardcoded værdier direkte fra querien
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return stringTODate(ast.value)
    }
  },
})
