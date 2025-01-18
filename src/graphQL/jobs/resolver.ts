import { GraphqlContext, jobDocument } from "../../common/Interfaces";
import * as jobService from "../../services/jobs";
import { 
    Job, 
    MutationCreateJobArgs, 
    MutationDeleteJobArgs, 
    MutationUpdateJobArgs, 
    QueryGetJobArgs, 
    QueryGetJobsArgs 
} from "../../common/Interfaces/graphql/graphql";


const user = (parent: jobDocument, args: Job, { userLoader }: GraphqlContext) => {
    return parent.createdBy ? userLoader.load(parent.createdBy.toString()) : null
};

const createJob = (_:any, args: MutationCreateJobArgs, { user }: GraphqlContext) => {
    return jobService.saveJob({ createdBy: `${user?._id!}`, ...args.data! })
};

const getJobs = (_: any, args: QueryGetJobsArgs) => {
    return jobService.getJobs(args.filters)
};

const getJob = (_:any, args: QueryGetJobArgs) => {
    return jobService.findJobById(args.id);
};

const updateJob = (_:any, args: MutationUpdateJobArgs) => {
    return jobService.updateJobById(args.data!);
};

const deleteJob = (_:any, args: MutationDeleteJobArgs, { user }: GraphqlContext) => {
    return jobService.deleteJob(`${user?._id}`, args.id);
};

export const jobsResolvers = {
    Query: {
        getJob,
        getJobs
    },

    Mutation: {
        createJob,
        updateJob,
        deleteJob
    },

    Job: {
        user
    }
};