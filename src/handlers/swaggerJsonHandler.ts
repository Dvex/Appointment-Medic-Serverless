import { APIGatewayProxyHandler } from 'aws-lambda';
// @ts-ignore
import YAML from 'yamljs';
import path from 'path';

export const handler: APIGatewayProxyHandler = async () => {
  const swaggerPath = path.join(__dirname, '../../openapi.yaml');
  const swaggerDoc = YAML.load(swaggerPath);

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(swaggerDoc)
  };
};
