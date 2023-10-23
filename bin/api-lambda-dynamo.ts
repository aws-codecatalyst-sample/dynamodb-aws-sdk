#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ApiLambdaDynamoStack } from '../lib/api-lambda-dynamo-stack';

const app = new cdk.App();
new ApiLambdaDynamoStack(app, 'ApiLambdaDynamoStack', {
});