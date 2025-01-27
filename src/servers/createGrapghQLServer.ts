import cors from "cors";
import { json } from "express";
import { ApolloServer, ContextFunction } from "@apollo/server";
import { expressMiddleware, ExpressContextFunctionArgument } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { CreateGraphQLServer, GraphqlContext } from "../common/Interfaces";
import { createDataLoaders } from "../dataloader";
import { formatError } from "./formatError";
import { isProduction } from "../common/contstants";
import { createGraphQLsubscriptionServer } from "./createGrapghQLSubscriptionServer";

const context: ContextFunction<[ExpressContextFunctionArgument], GraphqlContext> = async ({ req }) => {
    const token = req.token;
    const user = req.User;
    const dataLoaders = createDataLoaders();

    return {
        user,
        token,
        ...dataLoaders
    };
};

export const createGraphQLServer = async ({ app, schema, httpServer }: CreateGraphQLServer) => {
    const subscriptionServerCleanup = createGraphQLsubscriptionServer({ schema, httpServer })
    const server = new ApolloServer({
        schema,
        formatError,
        introspection: !isProduction,
        plugins: [{
            async serverWillStart() { return {
                async drainServer() { await subscriptionServerCleanup.dispose() }}
            }},
            ApolloServerPluginDrainHttpServer({httpServer})
        ]
    });

    await server.start();

    const apolloExpressMiddleware = expressMiddleware(server, { context });

    app.use('/graphql', cors(), json(), apolloExpressMiddleware);

    return server;
};