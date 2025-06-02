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
import { MissingOrMalformedAuthHeader, InvalidOrExpiredToken } from './utils/custom-errors.js'
import jwt from 'jsonwebtoken'

const PORT = 4000

const app = express()

const snakeCaseFieldResolver = (source, args, contextValue, info) => {
  return source[snakeCase(info.fieldName)]
}

//TODO Kan først aktiveres når vi har sat login op på frontenden. ellers er der ingen JWT sendt til vores endpoint
const context = async ({ req }) => {
  if (req.body.operationName === 'login') return { sql }
  return getVerifiedPayload(req)
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
    //context: async () => ({ sql }),
    context,
  }),
)

app.listen(PORT, () => console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`))

function getVerifiedPayload(req) {
  const token = req.headers.authorization
  if (!token) {
    throw new MissingOrMalformedAuthHeader()
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET)
    return { sql, req, user }
  } catch (err) {
    console.error('Verificeringsfejl:', err.message)
    throw new InvalidOrExpiredToken()
  }
}
