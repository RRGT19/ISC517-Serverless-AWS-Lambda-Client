/**
 * Lambda function
 */

const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
  const {
    pathParameters: { id }
  } = event; // Extracting an id from the request path
  const params = {
    TableName: "labhistory", // The name of your DynamoDB table
    Key: { id } // They key of the item you wish to find.
  };
  try {
    // Utilising the get method to retrieve an indvidual item
    const data = await documentClient.get(params).promise();
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers" : "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"
      },
      body: JSON.stringify(data.Item)
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
