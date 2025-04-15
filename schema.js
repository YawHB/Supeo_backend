export const typeDefs = `#graphql


type Employee {
    id: ID!
    firstName: String!
    lastName: String!
    role: String!
    email:String!
    phoneNumber: String!
}

type Admin {
    id: ID!
    first_name: String!
}

#Entry points
type Query {
    employees: [Employee]
    admins: [Admin]
}

`;
