import { QueryUserArgs } from '../../common/Interfaces/graphql/graphql';
import { GraphqlContext } from '../../common/Interfaces';
import * as userServices from '../../services/user/index';

const me = async (_: any, __: any, context: GraphqlContext ) => {
    return await userServices.getUserById(`${context.user?._id}`);
};

const user = async (_: any, args: QueryUserArgs) => {
    return await userServices.getUserById(args.id);
}

export const userResolver = {
    Query: {
        me,
        user
    }
}