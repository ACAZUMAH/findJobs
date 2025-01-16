import { Server } from "http";
import { Application } from "express";
import { GraphQLSchema } from "graphql";
import { userDocument } from "../users";
import { BaseContext } from "@apollo/server";

declare global {
    namespace Express {
      interface Request {
        token?: string
        user: userDocument
      }
  }
};

export interface GraphqlContext extends BaseContext {
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
