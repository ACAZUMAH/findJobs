"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authTypeDef = void 0;
exports.authTypeDef = `#graphql
    type authenticated {
        user: User!
        token: String
    }

    type signupResponse {
        message: String
    }

    type Query {
        auth: authenticated
    }

    type Mutation {
        signupWithPhoneAndPassword(input: signupInput): signupResponse!
        loginWithPhoneAndPassword(input: loginInput): authenticated!
        verifyOtp(input: otpInput): authenticated!
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