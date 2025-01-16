import { mergeSchemas } from "@graphql-tools/schema";
import { generalTypeDefs, generalResolvers } from "./general/index";
import { authTypeDefs, authResolvers } from "./auth/index";
import { userTypeDefs, userResolvers } from "./user/index";

const typeDefs = [
    generalTypeDefs, 
    authTypeDefs, 
    userTypeDefs
];


const resolvers = [
    generalResolvers,
    authResolvers,
    userResolvers
]

export const schema = mergeSchemas({ typeDefs, resolvers });