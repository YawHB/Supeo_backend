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
    start_time: String!
    end_time: String!
    duration: String!
    comment: String
    #date: dateScala!
}

type Admin {
    id: ID!
    first_name: String!
}

#Entry points
type Query {
    employees: [Employee]
    admins: [Admin]
    timeEntries: [TimeEntry]
}

`
