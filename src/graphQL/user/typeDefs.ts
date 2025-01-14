export const userTypeDef = `#graphql 
    type User {
        id: ID!
        username: String!
        name: String
        email: String
        phone: String
        isAuthenticated: Boolean
    }

    type Query {
        me: User 
        user(id: ID!): User!
    }
`;
