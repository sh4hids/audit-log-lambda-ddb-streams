import { ddbLogTable, ddbPrefixes, ddbIndexes } from '../config';
import DB from '../config/db';
import { AuditLogInterface } from '../config/types';
import { getSerializedData } from '../helpers/dynamodb';

const TableName = ddbLogTable;

export async function create(
  data: AuditLogInterface
): Promise<AuditLogInterface> {
  const now = new Date().toISOString();

  const params = {
    TableName,
    Item: {
      ...data,
      createdAt: now,
      updatedAt: now,
      PK: `${ddbPrefixes.form}#${data.newValue.id}`,
      SK: `${ddbPrefixes.log}#${ddbPrefixes.form}#${data.logType}#${data.newValue.updatedAt}`,
      [ddbIndexes.GSI1SK]: `${ddbPrefixes.user}#${data.createdBy.id}#${ddbPrefixes.log}#${ddbPrefixes.form}#${data.logType}#${data.newValue.updatedAt}`,
    },
  };

  await DB.put(params);

  return getSerializedData(params.Item);
}

export async function getByFormId(
  formId: string
): Promise<AuditLogInterface[]> {
  const params = {
    TableName,
    KeyConditionExpression: `PK = :hashKey`,
    ExpressionAttributeValues: {
      ':hashKey': `${ddbPrefixes.form}#${formId}`,
    },
  };

  const result = await DB.query(params);
  const auditLogs = getSerializedData(result.Items);

  return auditLogs;
}
