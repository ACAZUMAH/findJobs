import { MutationUpdateUserArgs, QueryUserArgs, User } from '../../common/Interfaces/graphql/graphql';
import { GraphqlContext, userDocument } from '../../common/Interfaces';
import * as userService from '../../services/user/index';

const me = async (_: any, __: any, context: GraphqlContext ) => {
    return userService.getUserById(context.user?._id!);
};

const user = async (_: any, args: QueryUserArgs) => {
    return userService.getUserById(args.id);
};

const updateUser = async (_: any, args: MutationUpdateUserArgs, { user }: GraphqlContext) => {
    return userService.getUserByIdAndUpdate({ id: `${user?._id}`, ...args.data})
};

const jobs = (parent: User, _: any, { jobLoader }: GraphqlContext) => {
    return parent.id ? jobLoader.load(parent.id.toString()) : null;
};

export const userResolvers = {
    Query: {
        me,
        user
    },

    Mutation: {
        updateUser
    },

    User: {
        jobs
    }
};