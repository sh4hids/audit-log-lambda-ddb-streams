import * as dotenv from 'dotenv';

dotenv.config();

export const awsRegion = process.env.AWS_REGION;
export const ddbLocalEndpoint = process.env.DDB_LOCAL_ENDPOINT;
export const ddbLogTable = process.env.DDB_LOG_TABLE;
export const ddbPrefixes = {
  form: 'FORM',
  log: 'LOG',
  user: 'USER',
};
export const ddbIndexes = {
  PK: 'PK',
  SK: 'SK',
  GSI1: 'GSI1',
  GSI1SK: 'GSI1SK',
};

export const ddbEventMap = {
  INSERT: 'CREATE',
  MODIFY: 'UPDATE',
  REMOVE: 'DELETE',
};
