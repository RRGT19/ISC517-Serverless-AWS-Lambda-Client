/**
 * Lambda function
 */

const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
  const {
    pathParameters: { id }
  } = event;
  const params = {
    TableName: "labhistory",
    Key: { id }
  };
  try {
    const data = await documentClient.delete(params).promise();
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"
      }
    };
    return response;
  } catch (e) {
    return {
      statusCode: 500
    };
  }
};

/**
 * Test event
 */

{
  "pathParameters": {
  "id": "002912e2c4912d0ba9655af24d23ad2d"
}
}
