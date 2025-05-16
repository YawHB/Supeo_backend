import { printSchema } from 'graphql'
import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'

export const typeDefs = loadSchemaSync('./**/*.graphql', {
  loaders: [new GraphQLFileLoader()],
})
