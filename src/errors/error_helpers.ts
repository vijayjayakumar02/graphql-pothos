import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ApiError, ApiErrorType } from '../errors/api_error';
import { isApiError } from '../errors/typeguards';
import { SchemaContext } from '../shared/shared_types';

type CatchResolverErrorConfig<Context extends SchemaContext> = {
  entity: Prisma.ModelName | 'Record';
  context: Context;
};

export function catchResolverError<Context extends SchemaContext>(
  error: Error | ApiError | PrismaClientKnownRequestError,
  { entity }: CatchResolverErrorConfig<Context>
): never {
  console.error(error);

  if (isApiError(error)) {
    throw error;
  }

  if ('code' in error) {
    switch (error.code) {
      case 'P2025': {
        throw new ApiError({
          type: ApiErrorType.NOT_FOUND,
          message: `${entity} not found`,
        });
      }
      case 'P2002': {
        throw new ApiError({
          type: ApiErrorType.CONFLICT,
          message: `${entity} already exists.`,
        });
      }
      case 'P2003': {
        throw new ApiError({
          type: ApiErrorType.FOREIGN_KEY_CONSTRAINT,
          message: `${entity} is being referenced by other records in the database.`,
        });
      }
    }
  }
  throw new ApiError({ type: ApiErrorType.UNHANDLED, message: error.message });
}
