import 'dotenv/config'
import express from 'express'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import cors from 'cors'
import bodyParser from 'body-parser'
import { typeDefs } from './schema.js'
import { sql } from './db_config.js'
import snakeCase from 'lodash.snakecase'
import { resolvers } from './resolvers/mergeResolver.js'

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

export default sql
