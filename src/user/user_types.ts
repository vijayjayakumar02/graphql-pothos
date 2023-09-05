import { builder } from '../builder';

builder.prismaObject('User', {
  fields: (t) => ({
    id: t.exposeString('id'),
    username: t.exposeString('username'),
    firstName: t.exposeString('firstName', { nullable: true }),
    lastName: t.exposeString('lastName', { nullable: true }),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
  }),
});

export const UserInput = builder.inputType('UserInput', {
  fields: (t) => ({
    username: t.string(),
    firstName: t.string(),
    lastName: t.string(),
  }),
});
