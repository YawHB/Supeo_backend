import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'
import { sql } from './db-config.js'
import snakeCase from 'lodash.snakecase'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { typeDefs } from './schema-builder/merge-type-defs.js'
import { resolvers } from './schema-builder/merge-resolvers.js'

const PORT = 4000

const app = express()

const snakeCaseFieldResolver = (source, args, contextValue, info) => {
  return source[snakeCase(info.fieldName)]
}

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  fieldResolver: snakeCaseFieldResolver,
})

await server.start()

app.use(
  '/graphql',
  cors(),
  bodyParser.json(),
  expressMiddleware(server, {
    context: async () => ({ sql }),
  }),
)

app.listen(PORT, () => console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`))
