const userResolver = {
    Query: {
        employees: async (_, __, { sql }) => {
            console.log('inside user call');
            return await sql`SELECT * FROM employee`;
        },
        admins: async (_, __, { sql }) => {
            console.log('inside user call');
            return await sql`SELECT * FROM admin`;
        },
    },
};

export { userResolver };
