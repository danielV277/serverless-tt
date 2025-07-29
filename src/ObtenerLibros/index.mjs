import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const ddbDocClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const handler = async (event) => {
  try {
    const result = await ddbDocClient.send(
      new ScanCommand({
        TableName: process.env.BOOKS_TABLE_NAME,
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify(result.Items ?? []),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};