"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
const http_1 = __importDefault(require("http"));
const servers_1 = require("./servers");
const graphQL_1 = require("./graphQL");
const connectDB_1 = require("./common/helpers/connectDB");
const error_Handler_1 = __importDefault(require("./middlewares/error-Handler"));
const middlewares_1 = require("./middlewares");
const routes_1 = require("./routes");
const logger_1 = require("./logger/logger");
const PORT = process.env.PORT || 3500;
const startApp = async () => {
    const app = (0, servers_1.createExpressApp)();
    const httpServer = http_1.default.createServer(app);
    (0, middlewares_1.applyMiddlewares)(app);
    (0, routes_1.applyRouters)(app);
    await (0, servers_1.createGraphQLServer)({ app, schema: graphQL_1.schema, httpServer });
    await (0, connectDB_1.connectDB)(String(process.env.MONGO_URL));
    app.use(error_Handler_1.default);
    app.all("*", (_req, _res, next) => {
        console.log('here');
        //next(createError(404, 'unable to retrive requested resources'))
    });
    await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
    logger_1.logger.info(`🚀 Server ready at http://localhost:${PORT}/`);
    logger_1.logger.info(`🚀 GraphQL Server ready at http://localhost:${PORT}/graphql`);
};
exports.default = startApp;
//# sourceMappingURL=app.js.map