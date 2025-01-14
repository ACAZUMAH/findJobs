"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const { combine, colorize, timestamp, json, errors } = winston_1.default.format;
exports.logger = winston_1.default.createLogger({
    format: combine(colorize({ all: true }), errors({ stack: true }), timestamp({ format: 'YYYY-MM-DD hh:mm:ss' }), json()),
    transports: [
        new winston_1.default.transports.File({ filename: 'error.log', level: 'error' }),
        new winston_1.default.transports.File({ filename: 'combine.log', level: 'info' })
    ]
});
if (process.env.NODE_ENV !== 'production') {
    exports.logger.add(new winston_1.default.transports.Console({ format: winston_1.default.format.simple() }));
}
;
//# sourceMappingURL=logger.js.map