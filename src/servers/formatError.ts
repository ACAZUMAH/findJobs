import { logger } from '../logger';
import { unwrapResolverError } from '@apollo/server/errors';
import { GraphQLFormattedError } from 'graphql/error';
import createError from 'http-errors';

const STATUS_CODES = new Map<number, string>([
    [400, 'BAD_REQUEST'],
    [401, 'UNAUTHORIZED'],
    [403, 'FORBIDDEN'],
    [404, 'NOT_FOUND'],
    [500, 'INTERNAL_SERVER_ERROR'],
    [502, 'BAD_GATEWAY']
])

export const formatError = (formattedError: GraphQLFormattedError, error: unknown): GraphQLFormattedError => {
    logger.error(error)
    const unwrappedError: any = unwrapResolverError(formattedError);
    if(!createError.isHttpError(unwrapResolverError)) {
        return formattedError
    };

    const formattedGraphQLError = {
      ...formattedError,
      message: unwrappedError.message,
      extensions: {
        ...formattedError.extensions,
        code: STATUS_CODES.get(unwrappedError.status) || 'INTERNAL_SERVER_ERROR'
      }
    };

    return formattedGraphQLError;
}