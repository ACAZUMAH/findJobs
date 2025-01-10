import { GraphqlContext } from '../../common/Interfaces';
import * as userServices from '../../services/user/index';

const me = async (_: any, __: any, context: GraphqlContext ) => {
    return await userServices.getUserById(`${context.user?._id}`);
};

const user = async (_: any, { id }) => {
    return await userServices.getUserById(id);
}

export const userResolver = {
    Query: {
        me,
        user
    }
}