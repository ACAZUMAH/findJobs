"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGraphQLsubscriptionServer = void 0;
const ws_1 = require("graphql-ws/lib/use/ws");
const ws_2 = require("ws");
const createGraphQLsubscriptionServer = ({ httpServer, schema }) => {
    const wsSever = new ws_2.WebSocketServer({
        path: '/graphql',
        server: httpServer
    });
    const serverCleanUp = (0, ws_1.useServer)({ schema }, wsSever);
    return serverCleanUp;
};
exports.createGraphQLsubscriptionServer = createGraphQLsubscriptionServer;
//# sourceMappingURL=createGrapghQLSubscriptionServer.js.map