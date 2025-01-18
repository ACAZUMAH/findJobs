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
const dataloader_1 = require("../dataloader");
const formatError_1 = require("./formatError");
const contstants_1 = require("../common/contstants");
const createGrapghQLSubscriptionServer_1 = require("./createGrapghQLSubscriptionServer");
const context = async ({ req }) => {
    const token = req.token;
    const user = req.user;
    const dataLoaders = (0, dataloader_1.createDataLoaders)();
    return {
        user,
        token,
        ...dataLoaders
    };
};
const createGraphQLServer = async ({ app, schema, httpServer }) => {
    const subscriptionServerCleanup = (0, createGrapghQLSubscriptionServer_1.createGraphQLsubscriptionServer)({ schema, httpServer });
    const server = new server_1.ApolloServer({
        schema,
        formatError: formatError_1.formatError,
        introspection: !contstants_1.isProduction,
        plugins: [{
                async serverWillStart() {
                    return {
                        async drainServer() { await subscriptionServerCleanup.dispose(); }
                    };
                }
            },
            (0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer })
        ]
    });
    await server.start();
    const apolloExpressMiddleware = (0, express4_1.expressMiddleware)(server, { context });
    app.use('/graphql', (0, cors_1.default)(), (0, express_1.json)(), apolloExpressMiddleware);
    return server;
};
exports.createGraphQLServer = createGraphQLServer;
//# sourceMappingURL=createGrapghQLServer.js.map