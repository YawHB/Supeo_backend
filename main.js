import 'dotenv/config';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import bodyParser from 'body-parser';

import { typeDefs } from './schema.js';
import { userResolver } from './resolvers/user.js';
import { sql } from './db_config.js';

const PORT = 4000;

const app = express();

export const server = new ApolloServer({
    typeDefs,
    resolvers: [userResolver],
});

await server.start();

app.use(
    '/graphql',
    cors(),
    bodyParser.json(),
    expressMiddleware(server, {
        context: async () => ({ sql }),
    })
);

app.listen(PORT, () =>
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`)
);

export default sql;
