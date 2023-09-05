import { printSchema, lexicographicSortSchema } from 'graphql';
import { writeFileSync } from 'fs';
import { builder } from './builder';
import './user';
import './errors';

export const schema = builder.toSchema();

const schemaAsString = printSchema(lexicographicSortSchema(schema));
writeFileSync(__dirname + '/schema.graphql', schemaAsString);
