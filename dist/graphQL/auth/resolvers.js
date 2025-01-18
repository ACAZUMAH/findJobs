"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authResolvers = void 0;
const auth_1 = require("../../services/auth/auth");
const auth_2 = require("../../services/auth");
const signupWithPhoneAndPassword = async (_, args) => {
    return await (0, auth_1.register)(args.data);
};
const loginWithPhoneAndPassword = async (_, args) => {
    return await (0, auth_1.login)(args.data);
};
const verifyOtp = async (_, args) => {
    return await (0, auth_2.verifyOtpAndCompleteAuth)(args.data.code);
};
exports.authResolvers = {
    Mutation: {
        signupWithPhoneAndPassword,
        loginWithPhoneAndPassword,
        verifyOtp
    },
};
//# sourceMappingURL=resolvers.js.map