export const authTypeDef = `#graphql
    type authenticated {
        user: User!
        token: String
    }

    type signupResponse {
        message: String
    }

    type loginResponse {
        message: String
    }

    type Query {
        auth: authenticated
    }

    type Mutation {
        signupWithPhoneAndPassword(input: signupInput): signupResponse!
        loginWithPhoneAndPassword(input: loginInput): loginResponse!
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
