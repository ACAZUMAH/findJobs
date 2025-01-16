export const userTypeDefs = `#graphql 
    type User {
        id: ID!
        username: String!
        name: String
        email: String
        phone: String
        isAuthenticated: Boolean
    }

    extend type Query {
        me: User!
        user(id: ID!): User!
    }

    extend type Mutation {
        updateUser(data: updateUserInput): User!
    }

    input updateUserInput {
        username: String
        name: String 
        email: String
        phone: String
    }
`;
