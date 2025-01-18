import { GraphqlContext, jobDocument } from "../../common/Interfaces";
import { Job, MutationCreateJobArgs, QueryGetJobsArgs } from "../../common/Interfaces/graphql/graphql";
import * as jobService from '../../services/jobs'

const user = (parent: jobDocument, args: Job, { userLoader }: GraphqlContext) => {
    return parent.createdBy ? userLoader.load(parent.createdBy.toString()) : null
};

const createJob = (_:any, args: MutationCreateJobArgs, { user }: GraphqlContext) => {
    return jobService.saveJob({ createdBy: `${user?._id!}`, ...args.data! })
};

const getJobs = (_: any, args: QueryGetJobsArgs) => {
    return jobService.getJobs(args.filters)
};

export const jobsResolvers = {
    Query: {
        getJobs
    },

    Mutation: {
        createJob
    },

    Job: {
        user
    }
};