import { mergeSchemas } from "@graphql-tools/schema";
import { generalTypeDefs, generalResolvers } from "./general/index";
import { authTypeDefs, authResolvers } from "./auth/index";
import { userTypeDefs, userResolvers } from "./user/index";
import { jobTypeDefs, jobsResolvers } from "./jobs/index";

const typeDefs = [
    generalTypeDefs, 
    authTypeDefs, 
    userTypeDefs,
    jobTypeDefs
];


const resolvers = [
    generalResolvers,
    authResolvers,
    userResolvers,
    jobsResolvers
]

export const schema = mergeSchemas({ typeDefs, resolvers });