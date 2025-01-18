"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const schema_1 = require("@graphql-tools/schema");
const index_1 = require("./general/index");
const index_2 = require("./auth/index");
const index_3 = require("./user/index");
const index_4 = require("./jobs/index");
const typeDefs = [
    index_1.generalTypeDefs,
    index_2.authTypeDefs,
    index_3.userTypeDefs,
    index_4.jobTypeDefs
];
const resolvers = [
    index_1.generalResolvers,
    index_2.authResolvers,
    index_3.userResolvers,
    index_4.jobsResolvers
];
exports.schema = (0, schema_1.mergeSchemas)({ typeDefs, resolvers });
//# sourceMappingURL=index.js.map