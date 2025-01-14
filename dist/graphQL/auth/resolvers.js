"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authResolver = void 0;
const auth_1 = require("../../services/auth/auth");
const auth_2 = require("../../services/auth");
const signupWithPhoneAndPassword = async (_, args) => {
    return await (0, auth_1.register)(args.input);
};
const loginWithPhoneAndPassword = async (_, args) => {
    return await (0, auth_1.login)(args.input);
};
const verifyOtp = async (_, args) => {
    return await (0, auth_2.verifyOtpAndCompleteAuth)(args.input.code);
};
exports.authResolver = {
    Mutation: {
        signupWithPhoneAndPassword,
        loginWithPhoneAndPassword,
        verifyOtp
    },
};
//# sourceMappingURL=resolvers.js.map