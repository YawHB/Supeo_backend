export const typeDefs = `#graphql
scalar Date


type Employee {
    id: ID!
    firstName: String!
    lastName: String!
    role: String!
    email:String!
    phoneNumber: String!
}

type TimeEntry{
    id: ID!
    startTime: String!
    endTime: String!
    duration: String!
    comment: String
   date: Date!

}

type Admin {
    id: ID!
    firstName: String!
}

#Entry points
type Query {
    employees: [Employee]!
    admins: [Admin]!
    timeEntries: [TimeEntry]!
}

`
