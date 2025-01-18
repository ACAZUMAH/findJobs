"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExpressApp = void 0;
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
//import limit from "express-rate-limit";
const express_1 = __importDefault(require("express"));
const helmetOtpions = {
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
};
// const rate =   limit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
// })
const createExpressApp = () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json({ limit: '50mb' }));
    app.set("trust proxy", 1);
    //app.use(rate);
    app.use((0, helmet_1.default)(helmetOtpions));
    app.use((0, cors_1.default)());
    app.get('/', (_, res) => {
        res.send('FindJobs');
    });
    return app;
};
exports.createExpressApp = createExpressApp;
//# sourceMappingURL=createExpressApp.js.map