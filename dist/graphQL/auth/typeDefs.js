"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authTypeDefs = void 0;
exports.authTypeDefs = `#graphql
    type authenticated {
        user: User!
        token: String
    }

    type signupResponse {
        message: String
    }

    extend type Query {
        auth: authenticated
    }

    extend type Mutation {
        signupWithPhoneAndPassword(data: signupInput): signupResponse!
        loginWithPhoneAndPassword(data: loginInput): authenticated!
        verifyOtp(data: otpInput): authenticated!
    }

    input signupInput {
        username: String!
        phone: String!
        password: String!
    }

    input loginInput {
        phone: String!
        password: String!
    }

    input otpInput {
        code: String!
    }

`;
//# sourceMappingURL=typeDefs.js.map