import * as aws from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';

import { awsRegion, ddbLocalEndpoint } from './index';

aws.config.update({ region: awsRegion });

const docClient = new aws.DynamoDB.DocumentClient(
  ddbLocalEndpoint
    ? { endpoint: ddbLocalEndpoint, convertEmptyValues: true }
    : { convertEmptyValues: true }
);

export default {
  get: (
    params
  ): Promise<
    PromiseResult<aws.DynamoDB.DocumentClient.GetItemOutput, aws.AWSError>
  > => docClient.get(params).promise(),
  put: (
    params
  ): Promise<
    PromiseResult<aws.DynamoDB.DocumentClient.PutItemOutput, aws.AWSError>
  > => docClient.put(params).promise(),
  query: (
    params
  ): Promise<
    PromiseResult<aws.DynamoDB.DocumentClient.QueryOutput, aws.AWSError>
  > => docClient.query(params).promise(),
  scan: (
    params
  ): Promise<
    PromiseResult<aws.DynamoDB.DocumentClient.ScanOutput, aws.AWSError>
  > => docClient.scan(params).promise(),
  update: (
    params
  ): Promise<
    PromiseResult<aws.DynamoDB.DocumentClient.UpdateItemOutput, aws.AWSError>
  > => docClient.update(params).promise(),
  delete: (
    params
  ): Promise<
    PromiseResult<aws.DynamoDB.DocumentClient.DeleteItemOutput, aws.AWSError>
  > => docClient.delete(params).promise(),
};
