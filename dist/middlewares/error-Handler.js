"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const logger_1 = require("../logger");
/**
 * catch all errors and return a response with custom error message
 * @param err error object
 * @param _req Request
 * @param _res Response
 * @param next NextFunction
 * @returns response with error message
 */
const errorHandler = (err, _req, res, next) => {
    logger_1.logger.error(err);
    if (err instanceof http_errors_1.default.HttpError) {
        return res.status(err.statusCode).json({ errors: [{ message: err.message }] });
    }
    return res.status(500).json({ errors: [{ message: 'Internal Server Error' }] });
};
exports.default = errorHandler;
//# sourceMappingURL=error-Handler.js.map