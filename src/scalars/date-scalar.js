import { GraphQLScalarType, Kind } from 'graphql'

export const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scala type',

  //Sender værdier til klienten
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

  //Modtager en værdi fra klienten
  parseValue(value) {
    //convert string to date
    const numberFromDate = Date.parse(value)
    const isoDate = new Date(numberFromDate)
    return isoDate
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
