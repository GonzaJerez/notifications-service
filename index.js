import {
  ApiGatewayManagementApiClient,
  PostToConnectionCommand,
} from "@aws-sdk/client-apigatewaymanagementapi";
import Redis from "ioredis";
import { config } from "dotenv";

export const handler = async (event) => {
  config();

  const post = JSON.parse(event?.Records?.[0].Sns?.Message ?? "{}");

  if (!post) return;

  const redisClient = new Redis(process.env.REDIS_REAL_TIME_CONNECTIONS);

  const connections = await redisClient.keys("*");

  const client = new ApiGatewayManagementApiClient({
    endpoint: process.env.API_WS_URL,
  });

  for (const connection of connections) {
    const command = new PostToConnectionCommand({
      Data: JSON.stringify(post),
      ConnectionId: connection,
    });
    await client.send(command);
  }

  const response = {
    statusCode: 200,
  };

  return response;
};
