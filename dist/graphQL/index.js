"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const schema_1 = require("@graphql-tools/schema");
const auth_1 = require("./auth");
const user_1 = require("./user");
const resolvers = [
    auth_1.authResolver,
    user_1.userResolver
];
const typeDefs = [
    auth_1.authTypeDef,
    user_1.userTypeDef
];
exports.schema = (0, schema_1.mergeSchemas)({ typeDefs, resolvers });
//# sourceMappingURL=index.js.map