"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatError = void 0;
const logger_1 = require("../logger");
const errors_1 = require("@apollo/server/errors");
const http_errors_1 = __importDefault(require("http-errors"));
const STATUS_CODES = new Map([
    [400, 'BAD_REQUEST'],
    [401, 'UNAUTHORIZED'],
    [403, 'FORBIDDEN'],
    [404, 'NOT_FOUND'],
    [500, 'INTERNAL_SERVER_ERROR'],
    [502, 'BAD_GATEWAY']
]);
const formatError = (formattedError, error) => {
    logger_1.logger.error(error);
    const unwrappedError = (0, errors_1.unwrapResolverError)(formattedError);
    if (!http_errors_1.default.isHttpError(errors_1.unwrapResolverError)) {
        return formattedError;
    }
    ;
    const formattedGraphQLError = {
        ...formattedError,
        message: unwrappedError.message,
        extensions: {
            ...formattedError.extensions,
            code: STATUS_CODES.get(unwrappedError.status) || 'INTERNAL_SERVER_ERROR'
        }
    };
    return formattedGraphQLError;
};
exports.formatError = formatError;
//# sourceMappingURL=formatError.js.map