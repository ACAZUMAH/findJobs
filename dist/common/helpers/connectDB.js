"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const logger_1 = require("../../logger");
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async (url) => {
    mongoose_1.default.connection.on('connected', () => {
        logger_1.logger.info('connected to MongoDB');
    });
    mongoose_1.default.connection.on('error', (err) => {
        logger_1.logger.error('Database error', err);
    });
    mongoose_1.default.connection.on('disconnected', (err) => {
        logger_1.logger.error('Database disconnected', err);
    });
    await mongoose_1.default.connect(url);
};
exports.connectDB = connectDB;
//# sourceMappingURL=connectDB.js.map