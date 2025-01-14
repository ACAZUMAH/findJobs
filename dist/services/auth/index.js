"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtpAndCompleteAuth = exports.createAuth = void 0;
const models_1 = require("../../models");
const helpers_1 = require("../../common/helpers");
const http_errors_1 = __importDefault(require("http-errors"));
const user_1 = require("../user");
const createAuth = async (userId, len) => {
    let token = (0, helpers_1.generateOTP)(len);
    while (await models_1.authModal.exists({ token })) {
        token = (0, helpers_1.generateOTP)(len);
    }
    ;
    const expiresIn = new Date(Date.now() + 1 * 60 * 60 * 1000);
    await models_1.authModal.findOneAndUpdate({ userId }, { userId, token, expiresIn }, { upsert: true });
    return token;
};
exports.createAuth = createAuth;
const verifyOtpAndCompleteAuth = async (token) => {
    const auth = await models_1.authModal.findOneAndDelete({ token });
    if (!auth)
        throw http_errors_1.default.BadRequest('Invalid otp');
    if (new Date(auth.expiresIn) < new Date())
        throw http_errors_1.default.BadRequest('Expired otp');
    const user = await (0, user_1.updateisAuthenticated)(auth.userId);
    const authToken = (0, helpers_1.jwtSign)({ id: user._id });
    return { user, token: authToken };
};
exports.verifyOtpAndCompleteAuth = verifyOtpAndCompleteAuth;
//# sourceMappingURL=index.js.map