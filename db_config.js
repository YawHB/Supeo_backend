import postgres from 'postgres';

export const sql = postgres({
    user: process.env.PS_USER,
    password: process.env.PS_PASSWORD,
    host: process.env.PS_HOST,
    port: Number(process.env.PS_PORT),
    database: process.env.PS_DATABASE,
});
