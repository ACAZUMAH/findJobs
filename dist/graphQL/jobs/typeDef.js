"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobTypeDefs = void 0;
exports.jobTypeDefs = `#graphql 

    enum WorkArrangement {
        ON_SITE
        HYBRID
        REMOTE
    }

    type Job {
        id: ID!
        createdBy: String!
        company: String!
        location: String!
        workArrangement: WorkArrangement!
        position: String!
        description: String
        requirements: [String!]!
        salary: Float
        user: User
    }

    input JobFilters {
        page: Int 
        limit: Int
        search: String
        createdBy: String
        company: String
        location: String
        workArrangement: WorkArrangement
        position: String
    }

    extend type Query {
        getJob(id: ID!): Job!
        getJobs(filters: JobFilters!): [Job]!
    }

    input CreateJobInput {
        company: String!
        location: String!
        workArrangement: WorkArrangement!
        position: String!
        description: String!
        requirements: [String!]!
        salary: Float!
    }

    extend type Mutation {
        createJob(data: CreateJobInput): Job!
    }
`;
//# sourceMappingURL=typeDef.js.map