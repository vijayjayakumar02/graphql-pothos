import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { createYoga } from 'graphql-yoga';
import { schema } from './schema';

const yoga = createYoga<{
  event: APIGatewayEvent;
  lambdaContext: Context;
}>({
  graphqlEndpoint: '/graphql',
  schema,
});

export async function handler(
  event: APIGatewayEvent,
  lambdaContext: Context
): Promise<APIGatewayProxyResult> {
  console.log('Received event:', JSON.stringify(event, null, 2));
  const response = await yoga.fetch(
    event.path +
      '?' +
      new URLSearchParams(
        (event.queryStringParameters as Record<string, string>) || {}
      ).toString(),
    {
      method: event.httpMethod,
      headers: event.headers as HeadersInit,
      body: event.body
        ? Buffer.from(event.body, event.isBase64Encoded ? 'base64' : 'utf8')
        : undefined,
    },
    {
      event,
      lambdaContext,
    }
  );
  console.log('Result:', response);
  const responseHeaders = Object.fromEntries(response.headers.entries());
  return {
    statusCode: 200,
    headers: responseHeaders,
    body: await response.text(),
    isBase64Encoded: false,
  };
}
