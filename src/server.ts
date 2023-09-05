import express from 'express';
import { createYoga } from 'graphql-yoga';
import { schema } from './schema';

const PORT = 8000;

const app = express();

const yoga = createYoga({
  schema,
});

app.use('/graphql', yoga);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${PORT}`);
});
