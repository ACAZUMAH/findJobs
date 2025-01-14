"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGraphQLServer = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = require("express");
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const formatError_1 = require("./formatError");
const context = ({ req }) => {
    const token = req.token;
    const user = req.user;
    return Promise.resolve({
        user,
        token
    });
};
const createGraphQLServer = async ({ app, schema, httpServer }) => {
    const server = new server_1.ApolloServer({
        schema,
        formatError: formatError_1.formatError,
        plugins: [(0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer })]
    });
    await server.start();
    const apolloExpressMiddleware = (0, express4_1.expressMiddleware)(server, { context });
    app.use('/graphql', (0, cors_1.default)(), (0, express_1.json)(), apolloExpressMiddleware);
    return server;
};
exports.createGraphQLServer = createGraphQLServer;
//# sourceMappingURL=createGrapghQLServer.js.map