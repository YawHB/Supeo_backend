import { GraphQLScalarType, Kind } from 'graphql'

export const dateScala = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scala type',

  //Sender værdier til klienten
  serialize(value) {
    const isoDate = new Date(value)
    return isoDate.toLocaleDateString('da-DK')
    // if (value instanceof Date) {
    //   return value.toLocaleDateString('da-DK')
    // }
  },

  //Modtager en værdi fra klienten
  parseValue(value) {
    //convert string to date
    const numberFromDate = Date.parse(value)
    const isoDate = new Date(numberFromDate)
    console.log('isoDate: ', isoDate.toISOString())
    return isoDate
    // return new Date(numberFromDate)
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
