const {DynamoDB} = require("@aws-sdk/client-dynamodb")
const { marshall } = require("@aws-sdk/util-dynamodb");
const dynamoClient = new DynamoDB;
const TableName = process.env.TEST_TABLE

exports.handler = async function (event) {
    console.log(JSON.parse(event.body))
    const Item = marshall(JSON.parse(event.body))
  try {
    dynamoClient.putItem({TableName, Item});
    return { body: 'Successfully created item!' };
  } catch (error){
    throw new Error(error.message)
  }
}