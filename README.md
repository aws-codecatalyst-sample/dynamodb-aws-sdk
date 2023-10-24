**Create a Rest API using AWS API gateway and lambda in VPC to DynamoDB.**

The main purpose of this project to test performance of AWS JavaScript SDK when invoking DynamoDB from Lambda function.

I created a simple infrastructure to demonstrates how to leverage AWS PrivateLink when Lambda is deployed in a VPC.

You can also perform volume testing using artillery.io and AWS Xray to evaluate the response time when calling DynamoDB putItem using AWS JavaScript SDK.

**Setup:**

`$ pip install -r requirements.txt`

At this point you can now synthesize the CloudFormation template for this code.

`$ cdk synth`

**Deploy:**

`cdk deploy`

**fter Deploy:**

Navigate to AWS API Gateway console and test the API with below sample data
```
{
    "id": "45545", 
    "title": "Sample test1 Widget",
    "name": "main_window",
    "width": 500,
    "height": 500
}
```
You should get below response

`{"Successfully created item"}`

**Load testing:**

In loadtesting/test.yaml, you can modify the test configuration based on your test case.

first is to install artillery

`npm install -g artillery`

go to folder loadtesting, and run

`artillery run test.yaml`

**Cleanup:**

Run below script to delete AWS resources created by this sample stack.

`cdk destroy`

