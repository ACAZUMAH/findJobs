"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAcessToken = void 0;
const index_1 = require("../common/helpers/index");
const index_2 = require("../services/user/index");
const http_errors_1 = __importDefault(require("http-errors"));
const verifyAcessToken = async (req, res, next) => {
    try {
        const bearerHeader = req.headers['authorization'];
        if (!bearerHeader)
            return next();
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer.length > 1 ? bearer[1] : bearer[0];
        if (!bearerToken)
            return next();
        const data = (0, index_1.jwtVerify)(bearerToken);
        if (!data?.id)
            return next();
        const user = await (0, index_2.getUserById)(data.id);
        req.user = user;
    }
    catch (err) {
        throw new http_errors_1.default.Unauthorized(err?.message || 'Invalid token');
    }
    ;
};
exports.verifyAcessToken = verifyAcessToken;
//# sourceMappingURL=verify-token.js.map