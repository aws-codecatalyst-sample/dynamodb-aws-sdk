import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { join } from 'path';
import { Duration, aws_iam as iam, aws_ec2 as ec2 }from 'aws-cdk-lib';
import { LambdaIntegration, MethodLoggingLevel, RestApi } from "aws-cdk-lib/aws-apigateway"
import { CfnOutput } from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class ApiLambdaDynamoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, 'Ingress', {
      ipAddresses: ec2.IpAddresses.cidr("10.1.0.0/16"),
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: 'private',
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
        }
      ]
    })

    const dynamoDbEndpoint = vpc.addGatewayEndpoint('DynamoDbEndpoint', {
      service: ec2.GatewayVpcEndpointAwsService.DYNAMODB,
    })

    // This allows to customize the endpoint policy
    dynamoDbEndpoint.addToPolicy(
      new iam.PolicyStatement({ // add permissions to table
        principals: [new iam.AnyPrincipal()],
        actions: ['dynamodb:DescribeTable', 'dynamodb:ListTables', "dynamodb:Get*",
        "dynamodb:Query",
        "dynamodb:Scan",
        "dynamodb:CreateTable",
        "dynamodb:Delete*",
        "dynamodb:Update*",
        "dynamodb:PutItem"],
        resources: ['*'],
      }))

      const testTable = new Table(this, "TestTable", {
        partitionKey: {name: 'id', type: AttributeType.STRING}
      })

      const putTestFunction = new NodejsFunction(this, "PutTestFunction", {
        runtime: lambda.Runtime.NODEJS_18_X,
        handler: 'handler',
        entry: (join(__dirname, '..','lambda', 'lambda-dynamo-handler.js')),
        vpc: vpc,
        vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_ISOLATED },
        memorySize: 1024,
        timeout: Duration.minutes(1),
        environment:{
          'TEST_TABLE': testTable.tableName
        },
        tracing: lambda.Tracing.ACTIVE,
      })

      testTable.grantWriteData(putTestFunction)

      const restApi = new RestApi(this, this.stackName + "RestApi", {
        deployOptions: {
            stageName: "beta",
            metricsEnabled: true,
            loggingLevel: MethodLoggingLevel.INFO,
            dataTraceEnabled: true,
        },
    })

    restApi.root.addMethod("POST", new LambdaIntegration(putTestFunction, {}))

    new CfnOutput(this, 'API url', {
      value: restApi.url!
    })
  }



}
