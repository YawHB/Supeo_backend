export const typeDefs = `#graphql
scalar Date


type Employee {
    id: ID!
    firstName: String!
    lastName: String!
    role: String!
    email:String!
    phoneNumber: String!
    timeEntries: [TimeEntry]!
   
}

type TimeEntry{
    id: ID!
    startTime: String!
    endTime: String!
    duration: String!
    comment: String
    date: Date!
    employee: Employee!

}

type Admin {
    id: ID!
    firstName: String!
}

#Entry points
type Query {
    employees: [Employee]!
    employee(id: ID!):Employee!
   
    admins: [Admin]!
    timeEntries: [TimeEntry]!
    
}

`
