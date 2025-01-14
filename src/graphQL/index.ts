import { mergeSchemas } from "@graphql-tools/schema";
import { authTypeDef, authResolver } from "./auth";
import { userTypeDef, userResolver } from "./user";

const resolvers = [
    authResolver,
    userResolver
]

const typeDefs = [
    authTypeDef,
    userTypeDef
]

export const schema = mergeSchemas({ typeDefs, resolvers });