/* eslint-disable import/prefer-default-export */
import { DynamoDBStreamEvent } from 'aws-lambda';

import { ddbEventMap } from './config';
import { LogType } from './config/types';
import { formatRawData } from './helpers/dynamodb';
import * as AuditLogModel from './models/AuditLog';

export async function handler(
  event: DynamoDBStreamEvent
): Promise<{ message: string }> {
  event.Records.forEach(async (record) => {
    const { eventName, dynamodb } = record;
    const newValue = formatRawData(dynamodb.NewImage);
    const oldValue = formatRawData(dynamodb.OldImage);

    const data = {
      newValue,
      oldValue,
      logType: ddbEventMap[eventName] as LogType,
      createdBy:
        JSON.parse(newValue.updatedBy) || JSON.parse(oldValue.updatedBy),
    };

    await AuditLogModel.create(data);
  });

  return {
    message: 'Log added successfully',
  };
}

handler({
  Records: [
    {
      eventID: '7de3041dd709b024af6f29e4fa13d34c',
      eventName: 'INSERT',
      eventVersion: '1.1',
      eventSource: 'aws:dynamodb',
      awsRegion: 'region',
      dynamodb: {
        ApproximateCreationDateTime: 1479499740,
        Keys: {
          PK: {
            S: 'FORM_DATA#2021-12',
          },
          SK: {
            S: 'FORM#125',
          },
        },
        NewImage: {
          PK: {
            S: 'FORM_DATA#2021-12',
          },
          SK: {
            S: 'FORM#125',
          },
          id: {
            S: '125',
          },
          field1: {
            S: 'field data',
          },
          field2: {
            S: 'field data',
          },
          createdBy: {
            S: '{"id":125,"firstName":"Jenny","lastName":"Doe"}',
          },
          updatedBy: {
            S: '{"id":125,"firstName":"Jenny","lastName":"Doe"}',
          },
          createdAt: {
            S: '2021-12-09T06:09:54.149Z',
          },
          updatedAt: {
            S: '2021-12-09T06:09:54.149Z',
          },
        },
        SequenceNumber: '13021600000000001596893679',
        SizeBytes: 112,
        StreamViewType: 'NEW_AND_OLD_IMAGES',
      },
      eventSourceARN:
        'arn:aws:dynamodb:region:123456789012:table/BarkTable/stream/2016-11-16T20:42:48.104',
    },
  ],
});

handler({
  Records: [
    {
      eventID: '7de3041dd709b024af6f29e4fa13d34c',
      eventName: 'MODIFY',
      eventVersion: '1.1',
      eventSource: 'aws:dynamodb',
      awsRegion: 'region',
      dynamodb: {
        ApproximateCreationDateTime: 1479499740,
        Keys: {
          PK: {
            S: 'FORM_DATA#2021-12',
          },
          SK: {
            S: 'FORM#125',
          },
        },
        NewImage: {
          PK: {
            S: 'FORM_DATA#2021-12',
          },
          SK: {
            S: 'FORM#125',
          },
          id: {
            S: '125',
          },
          field1: {
            S: 'field data v2',
          },
          field2: {
            S: 'field data v2',
          },
          createdBy: {
            S: '{"id":125,"firstName":"Jenny","lastName":"Doe"}',
          },
          updatedBy: {
            S: '{"id":145,"firstName":"John","lastName":"Doe"}',
          },
          createdAt: {
            S: '2021-12-09T06:09:54.149Z',
          },
          updatedAt: {
            S: '2021-12-09T06:35:54.149Z',
          },
        },
        OldImage: {
          PK: {
            S: 'FORM_DATA#2021-12',
          },
          SK: {
            S: 'FORM#125',
          },
          id: {
            S: '125',
          },
          field1: {
            S: 'field data',
          },
          field2: {
            S: 'field data',
          },
          createdBy: {
            S: '{"id":125,"firstName":"Jenny","lastName":"Doe"}',
          },
          updatedBy: {
            S: '{"id":125,"firstName":"Jenny","lastName":"Doe"}',
          },
          createdAt: {
            S: '2021-12-09T06:09:54.149Z',
          },
          updatedAt: {
            S: '2021-12-09T06:09:54.149Z',
          },
        },
        SequenceNumber: '13021600000000001596893679',
        SizeBytes: 112,
        StreamViewType: 'NEW_AND_OLD_IMAGES',
      },
      eventSourceARN:
        'arn:aws:dynamodb:region:123456789012:table/BarkTable/stream/2016-11-16T20:42:48.104',
    },
  ],
});
