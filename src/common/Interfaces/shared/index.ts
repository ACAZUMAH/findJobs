import { Server } from "http";
import { Application } from "express";
import { GraphQLSchema } from "graphql";
import { userDocument } from "../users";
import { BaseContext } from "@apollo/server";
import { createDataLoaders } from "../../../dataloader";

declare global {
    namespace Express {
      interface Request {
        token?: string
        user: userDocument
      }
  }
};

export type  DataLoaderMap = ReturnType<typeof createDataLoaders>
export interface GraphqlContext extends BaseContext, DataLoaderMap {
  token?: string
  user?: userDocument
}

export interface CreateGraphQLServer {
  app: Application;
  schema: GraphQLSchema;
  httpServer: Server;
};


export interface CreateGraphQLsubscriptionServer {
  httpServer: Server,
  schema: GraphQLSchema
}
