"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userTypeDef = void 0;
exports.userTypeDef = `#graphql 
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
//# sourceMappingURL=typeDefs.js.map