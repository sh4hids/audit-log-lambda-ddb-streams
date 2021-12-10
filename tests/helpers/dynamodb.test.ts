import { getSerializedData } from '../../src/helpers/dynamodb';

test('should return serialized data', () => {
  const rawData = [
    {
      logType: 'CREATE',
      newValue: {
        createdAt: '2021-12-09T06:09:54.149Z',
        field1: 'test',
        id: 123,
        field2: 'another test',
        updatedAt: '2021-12-09T06:09:54.149Z',
      },
      createdAt: '2021-12-09T09:11:01.988Z',
      createdBy: { firstName: 'John', lastName: 'Doe', id: 145 },
      GSI1SK: 'USER#145#LOG#FORM#CREATE#2021-12-09T06:09:54.149Z',
      SK: 'LOG#FORM#CREATE#2021-12-09T06:09:54.149Z',
      oldValue: null,
      PK: 'FORM#123',
      updatedAt: '2021-12-09T09:11:01.988Z',
    },
    {
      logType: 'UPDATE',
      newValue: {
        createdAt: '2021-12-09T06:09:54.149Z',
        field1: 'test v2',
        id: 123,
        field2: 'another test v2',
        updatedAt: '2021-12-09T06:10:54.149Z',
      },
      createdAt: '2021-12-09T09:11:02.003Z',
      createdBy: { firstName: 'Jenny', lastName: 'Doe', id: 125 },
      GSI1SK: 'USER#125#LOG#FORM#UPDATE#2021-12-09T06:10:54.149Z',
      SK: 'LOG#FORM#UPDATE#2021-12-09T06:10:54.149Z',
      oldValue: {
        createdAt: '2021-12-09T06:09:54.149Z',
        field1: 'test',
        id: 123,
        field2: 'another test',
        updatedAt: '2021-12-09T06:09:54.149Z',
      },
      PK: 'FORM#123',
      updatedAt: '2021-12-09T09:11:02.003Z',
    },
  ];
  const expectedResult = [
    {
      logType: 'CREATE',
      newValue: {
        createdAt: '2021-12-09T06:09:54.149Z',
        field1: 'test',
        id: 123,
        field2: 'another test',
        updatedAt: '2021-12-09T06:09:54.149Z',
      },
      createdAt: '2021-12-09T09:11:01.988Z',
      createdBy: { firstName: 'John', lastName: 'Doe', id: 145 },
      oldValue: null,
      updatedAt: '2021-12-09T09:11:01.988Z',
    },
    {
      logType: 'UPDATE',
      newValue: {
        createdAt: '2021-12-09T06:09:54.149Z',
        field1: 'test v2',
        id: 123,
        field2: 'another test v2',
        updatedAt: '2021-12-09T06:10:54.149Z',
      },
      createdAt: '2021-12-09T09:11:02.003Z',
      createdBy: { firstName: 'Jenny', lastName: 'Doe', id: 125 },
      oldValue: {
        createdAt: '2021-12-09T06:09:54.149Z',
        field1: 'test',
        id: 123,
        field2: 'another test',
        updatedAt: '2021-12-09T06:09:54.149Z',
      },
      updatedAt: '2021-12-09T09:11:02.003Z',
    },
  ];

  expect(getSerializedData(rawData)).toEqual(expectedResult);
});
