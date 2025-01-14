"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
/**
 * this function validates request data
 * @param validations array of validation middlewares
 * @returns void
 * @throws BadRequest if validation fails
 */
const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                throw new http_errors_1.default.BadRequest(result.array()[0].msg);
            }
        }
        next();
    };
};
exports.validate = validate;
exports.default = exports.validate;
//# sourceMappingURL=index.js.map