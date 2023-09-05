import { builder } from '../builder';
import { UserInput } from './user_types';
import { ApiError, ApiErrorType } from '../errors/api_error';
import { db } from '../db';
import { catchResolverError } from '../errors/error_helpers';
import { assertNonNullish } from '../errors/typeguards';

//mutations
builder.mutationFields((t) => ({
  createUser: t.prismaField({
    type: 'User',
    args: {
      input: t.arg({ type: UserInput, required: true }),
    },
    errors: {
      types: [ApiError],
      directResult: true,
    },
    resolve: async (query, root, args, context) => {
      const { input } = args;
      const { username } = input;
      assertNonNullish(
        username,
        new ApiError({
          type: ApiErrorType.BAD_REQUEST,
          message: `Title is a required field.`,
        })
      );

      try {
        const user = await db.user.create({
          data: {
            ...input,
            username,
          },
        });
        return user;
      } catch (error) {
        catchResolverError(error, { entity: 'User', context });
      }
    },
  }),
}));

//query
builder.queryFields((t) => ({
  userList: t.prismaField({
    type: ['User'],
    nullable: true,
    errors: {
      types: [ApiError],
      directResult: false,
      dataField: {
        name: 'users',
      },
    },
    resolve: async (query, root, args, context) => {
      try {
        console.log('oombu');
        return await db.user.findMany();
      } catch (error) {
        catchResolverError(error, { entity: 'User', context });
      }
    },
  }),
}));
