/* eslint-disable import/prefer-default-export */
import { ddbIndexes } from '../config';

export function getSerializedData(data): any {
  let result;

  if (Array.isArray(data)) {
    result = [...data];
    result = result.map((item) => {
      const resultItem = { ...item };
      Object.values(ddbIndexes).forEach((value) => {
        delete resultItem[value];
      });

      return resultItem;
    });

    return result;
  }

  result = { ...data };

  Object.values(ddbIndexes).forEach((value) => {
    delete result[value];
  });

  return result;
}

export function formatRawData(data): any {
  let fromattedData = null;

  if (data) {
    fromattedData = {};

    Object.keys(data).forEach((key) => {
      fromattedData[key] = data[key].S;
    });
  }

  return fromattedData;
}
