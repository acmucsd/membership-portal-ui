/* eslint-disable import/prefer-default-export */

export const generateQuery = (params: any): string => {
  if (!params || Object.keys(params).length === 0) {
    return '';
  }

  return `?${Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join('&')}`;
};
