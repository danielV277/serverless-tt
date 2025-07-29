import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const ddbDocClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export const handler = async (event) => {
  try {
    const book = JSON.parse(event.body);

    const newBook = {
      ...book,
      id: book.id ?? crypto.randomUUID(),
    };

    await ddbDocClient.send(
      new PutCommand({
        TableName: process.env.BOOKS_TABLE_NAME,
        Item: newBook,
      })
    );

    return {
      statusCode: 201,
      body: JSON.stringify(newBook),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
