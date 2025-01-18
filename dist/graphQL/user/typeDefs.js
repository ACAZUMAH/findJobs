"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userTypeDefs = void 0;
exports.userTypeDefs = `#graphql 
    type User {
        id: ID!
        username: String!
        firstName: String
        lastName: String
        email: String
        phone: String
        isAuthenticated: Boolean
        jobs: Job
    }

    extend type Query {
        me: User!
        user(id: ID!): User!
    }

    extend type Mutation {
        updateUser(data: UpdateUserInput): User!
    }

    input UpdateUserInput {
        username: String
        firstName: String 
        lastName: String
        email: String
        phone: String
    }
`;
//# sourceMappingURL=typeDefs.js.map