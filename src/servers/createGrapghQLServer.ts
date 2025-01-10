import cors from "cors";
import { json } from "express";
import { ApolloServer, ContextFunction } from "@apollo/server";
import { expressMiddleware, ExpressContextFunctionArgument } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { CreateGraphQLServer, GraphqlContext } from "../common/Interfaces";

const context: ContextFunction<[ExpressContextFunctionArgument], GraphqlContext> = ({ req }) => {
    const token = req.token;
    const user = req.user; 

    return Promise.resolve({
        user,
        token
    });
};

export const createGraphQLServer = async ({ app, schema, httpServer }: CreateGraphQLServer) => {
    const server = new ApolloServer({
        schema,
        plugins: [ApolloServerPluginDrainHttpServer({httpServer})]
    });

    await server.start();

    const apolloExpressMiddleware = expressMiddleware(server, { context });

    app.use('/graphql', cors(), json(), apolloExpressMiddleware);

    return server;
};