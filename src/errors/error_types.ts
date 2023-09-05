import { builder } from '../builder';
import { ApiError, ApiErrorType } from '../errors/api_error';

builder.enumType(ApiErrorType, {
  name: 'ApiErrorType',
});

builder.objectType(ApiError, {
  name: 'ApiError',
  fields: (t) => ({
    errorMessage: t.exposeString('message'),
    errorType: t.field({
      type: ApiErrorType,
      resolve: (parent) => parent.type,
    }),
  }),
});
