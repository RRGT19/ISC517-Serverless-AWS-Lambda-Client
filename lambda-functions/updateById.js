/**
 * Lambda function
 */

const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
  const {
    pathParameters: { id }
  } = event;
  const { email, name, time } = JSON.parse(event.body);
  const params = {
    TableName: "labhistory",
    Item: {
      id: id,
      email: email,
      name: name,
      time: time
    }
  };
  try {
    const data = await documentClient.put(params).promise();
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
  "id": "b787ba32df83b5e0e32bf9a7d3e55bb5",
    "email": "test@gmail.com",
    "name": "Lorem",
    "time": "11:00 am"
}
}
