"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const helpers_1 = require("../../common/helpers");
const user_1 = require("../user");
const _1 = require(".");
const contstants_1 = require("../../common/contstants");
const messaging_1 = require("../messaging");
/**
 * register the user and send otp code
 * @returns user name and token
 * @throws BadRequest if validation fails and user already exists
 */
const register = async (input) => {
    const { phone } = input;
    await (0, user_1.checkUserExists)(phone);
    const hash = await (0, helpers_1.hashPassword)(input.password);
    const user = await (0, user_1.createUser)({ ...input, password: hash });
    const token = await (0, _1.createAuth)(user._id, 5);
    await (0, messaging_1.sendSms)(phone, token);
    if (contstants_1.isDevelopment)
        return { message: `otp: ${token}` };
    return "OTP send to your phone";
};
exports.register = register;
/**
 * login user
 * @returns user and token
 * @throws BadRequest if validation fails,
 * user does not exist or password is incorrect
 */
const login = async (input) => {
    const { phone, password } = input;
    const auth = await (0, user_1.getUserByPhone)(phone);
    const isMatch = await (0, helpers_1.comparePassword)(password, auth.password);
    if (!isMatch)
        throw new http_errors_1.default.BadRequest("Invalid password");
    if (!auth.isAuthenticated) {
        const token = await (0, _1.createAuth)(auth._id, 5);
        await (0, messaging_1.sendSms)(phone, token);
        return "OTP send to your phone";
    }
    const user = await (0, user_1.getUserById)(auth._id);
    const token = (0, helpers_1.jwtSign)({ id: user._id });
    return { user, token };
};
exports.login = login;
//# sourceMappingURL=auth.js.map