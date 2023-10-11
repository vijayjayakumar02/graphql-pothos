import { builder } from './builder';
import './user';
import './errors';

export const schema = builder.toSchema();
