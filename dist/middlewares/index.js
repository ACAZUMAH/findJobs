"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyMiddlewares = void 0;
const verify_token_1 = require("./verify-token");
const middlewares = [verify_token_1.verifyAcessToken];
const applyMiddlewares = (app) => {
    middlewares.map((middleware) => app.use(middleware));
};
exports.applyMiddlewares = applyMiddlewares;
//# sourceMappingURL=index.js.map