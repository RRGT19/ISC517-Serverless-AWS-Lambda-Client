/**
 * Lambda function
 */

const AWS = require("aws-sdk");
const crypto = require("crypto");

// Generate unique id with no external dependencies
const generateUUID = () => crypto.randomBytes(16).toString("hex");

// Initialising the DynamoDB SDK
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  const { email, name, time } = JSON.parse(event.body);
  const params = {
    TableName: "labhistory", // The name of the DynamoDB table
    Item: { // Creating an Item with a unique id and with the passed properties
      id: generateUUID(),
      email: email,
      name: name,
      time: time
    }
  };

  try {
    // Step 1. Apply business rules
    // Utilising the scan method to get all items in the table
    // We don't use a query because we will need to create a global secondary index and this have extra cost.
    const data = await documentClient.scan({TableName: params.TableName}).promise();

    // Filter by time
    const isLimitPerHourReached = data.Items.filter(i => i.time === time).length > 6;
    console.log("isLimitPerHourReached: " + isLimitPerHourReached);

    if (isLimitPerHourReached) {

      const response = {
        statusCode: 409, // Returning a 409
        body: JSON.stringify({ error: 'El tiempo solicitado ya ha alcanzado el máximo permitido (7).' }),
        headers: {
          "Access-Control-Allow-Headers" : "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*"
        }
      };

      context.succeed(response);

    } else {

      // Step 2. Create the item
      // Utilising the put method to insert an item into the table (https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.03.html#GettingStarted.NodeJs.03.01)
      const data = await documentClient.put(params).promise();
      const response = {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Headers" : "Content-Type",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*"
        }
      };
      return response; // Returning a 200 if the item has been inserted
    }

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
  "body": "{\"email\": \"test@gmail.com\", \"name\": \"Pedro\", \"time\": \"11:00 am\"}"
}
