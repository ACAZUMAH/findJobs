import { MutationUpdateUserArgs, QueryUserArgs } from '../../common/Interfaces/graphql/graphql';
import { GraphqlContext } from '../../common/Interfaces';
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

export const userResolvers = {
    Query: {
        me,
        user
    },

    Mutation: {
        updateUser
    }
}