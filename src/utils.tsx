import React from 'react';
import { notification } from 'antd';

import Storage from './storage';
import { HttpRequestMethod, MimeType, FetchServiceOptions, PublicMerchItemOption, OrderStatus } from './types';

import DiamondDisplay from './store/components/DiamondDisplay';
import history from './history';

export const notify = (title: string, description: string) => {
  notification.open({
    message: title,
    description,
  });
};

/**
 * Returns a random default profile picture out of a select few generated from getDefaultProfile
 * @return {string} A link to the profile picture
 */

export const getDefaultProfile = (): string => {
  const randomIndex = Math.floor(Math.random() * 9);
  return `${window.location.origin}/adorableprofiles/adorable${randomIndex}.png`;
};

/**
 * Returns a rank based on the number of points.
 * @param {number} points The number of points the user has.
 * @return {string} A link to a default profile picture.
 */
export const getRank = (points: number): string => {
  const ranks = [
    'Factorial Flatbread',
    'Exponential Eclair',
    'Polynomial Pita',
    'Cubic Croissant',
    'Quadratic Qornbread',
    'Linear Loaf',
    'nlog Naan',
    'Constant Cornbread',
    'Binary Baguette',
    'Blessed Boba',
    'Super Snu',
    'Soon(TM)',
    'Later(TM)',
    'Sometime(TM)',
    'We Ran Out Of Ranks',
  ];
  const index = Math.min(ranks.length - 1, Math.floor(points / 100));
  return ranks[index];
};

/**
 * Formats a date to be readable.
 * @param {string} time The time in unformatted form.
 * @return {string} The formatted time in a readable format
 */
export const formatDate = (time: string): string => {
  const parsedTime = Date.parse(time);
  const parsedDate = new Date(parsedTime);
  return parsedDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Extracts the time from a UTC-formatted timestamp.
 *
 * Example: '1970-01-01T17:00:00.000Z' => '5:00 PM'
 *
 * @param {string} time The time in UTC string format.
 * @return {string} The time of day.
 */
export const formatTime = (time: string | number | Date): string => {
  const parsedTime = new Date(time);
  return parsedTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

/**
 * Converts the month to an index
 * @param {string} month The month in string form.
 * @return {number} The month in number form.
 */
export const getMonthIndex = (month: string): number => {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  function checkMonth(currMonth: string) {
    return month === currMonth;
  }

  return monthNames.findIndex(checkMonth);
};

/**
 * Retrieves the level from the number of points.
 * @param {number} points The number of the points the user has.
 * @return {number} The current level of the user.
 */
export const getLevel = (points: number): number => {
  return Math.floor(points / 100) + 1;
};

/**
 * Determines if given string is a valid website link.
 * @param {string} str The string containing a potential URL.
 * @return {boolean} True if valid URL, false otherwise.
 */
export const isURL = (str: string): boolean => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', // fragment locator
    'i',
  );

  return !!pattern.test(str);
};

/**
 * Ensures a valid website link is an absolute path.
 * @param {string} str The string containing a URL.
 * @return {string} A guaranteed absolute path for the link.
 */
export const getAbsoluteURL = (str: string): string => {
  if (isURL(str) && !/^https?:\/\//i.test(str)) {
    return `http://${str}`;
  }

  return str;
};

/**
 * Recursive function to print all errors from back-end.
 *
 * @param error the current error.
 * @returns the error message.
 */
const getServiceErrorMessage = (error) => {
  let messages = '';
  if (error.constraints) {
    Object.values(error.constraints).forEach((message) => {
      messages += message;
    });
  }
  const { children } = error;
  for (let i = 0; i < children.length; i += 1) {
    messages += `${getServiceErrorMessage(children[i])} `;
  }
  return messages;
};

/**
 * Fetches data from server with simple error handling
 */
export const fetchService = async (url: string, requestMethod: HttpRequestMethod, mimeType: MimeType, options: FetchServiceOptions) => {
  const { payload, requiresAuthorization } = options;

  let Accept;
  let ContentType;

  switch (mimeType) {
    case 'json':
      Accept = 'application/json';
      ContentType = 'application/json';
      break;
    case 'image':
      Accept = 'multipart/form-data';
      break;
    default:
      break;
  }

  const response = await fetch(url, {
    method: requestMethod,
    headers: {
      Accept,
      ...(ContentType && { 'Content-Type': ContentType }), // set content-type if json or image
      ...(requiresAuthorization && { Authorization: `Bearer ${Storage.get('token')}` }), // set bearer token if needed
    },
    ...(payload && { body: payload }), // set payload if provided
  });

  const { status } = response;
  if (status === 401 || status === 403) history.push('/login');
  const data = await response.json();
  if (!data) throw new Error('Empty response from server');
  if (data.error) {
    let { message } = data.error;
    if (status === 400 && data.error.errors) {
      let messages = '';
      const { errors } = data.error;
      for (let i = 0; i < errors.length; i += 1) {
        messages += `${getServiceErrorMessage(errors[i])} `;
      }
      message = messages;
    }
    throw new Error(message);
  }

  return data;
};

export const processItem = (
  options: PublicMerchItemOption[],
): {
  outOfStock: boolean;
  onSale: boolean;
  priceRange: {
    low: number;
    high: number;
  };
  cheapestSalePriceTuple: {
    normalPrice: number;
    salePrice: number;
  };
} => {
  const outOfStock = options.every((option) => option.quantity === 0);
  const onSale = options.some((option) => option.discountPercentage !== 0);
  const priceRange = options.reduce(
    (acc, option) => {
      const newAcc = acc;
      if (acc.low > option.price) {
        newAcc.low = option.price;
      }
      if (acc.high < option.price) {
        newAcc.high = option.price;
      }
      return newAcc;
    },
    {
      low: Number.POSITIVE_INFINITY,
      high: Number.NEGATIVE_INFINITY,
    },
  );

  const cheapestSalePriceTuple = options.reduce(
    (acc, option) => {
      const currentOptionDiscountPrice = ((100 - option.discountPercentage) * option.price) / 100;
      return acc.salePrice > currentOptionDiscountPrice
        ? {
            normalPrice: option.price,
            salePrice: currentOptionDiscountPrice,
          }
        : acc;
    },
    {
      normalPrice: Infinity,
      salePrice: Infinity,
    },
  );

  return { outOfStock, onSale, priceRange, cheapestSalePriceTuple };
};

export const processItemPrice = (options: PublicMerchItemOption[]): React.ReactNode => {
  const { outOfStock, onSale, priceRange, cheapestSalePriceTuple } = processItem(options);

  if (outOfStock) {
    return <DiamondDisplay outOfStock />;
  }
  if (onSale) {
    if (cheapestSalePriceTuple.normalPrice === cheapestSalePriceTuple.salePrice) {
      return <DiamondDisplay value={cheapestSalePriceTuple.normalPrice} />;
    }
    return <DiamondDisplay value={cheapestSalePriceTuple.normalPrice} saleValue={cheapestSalePriceTuple.salePrice} />;
  }
  if (priceRange.low === priceRange.high) {
    return <DiamondDisplay value={priceRange.low} />;
  }
  return <DiamondDisplay prefix={`${priceRange.low.toLocaleString('en-US')} - `} value={priceRange.high} />;
};

export const toProperCase = (s: string) => {
  return s
    .split(' ')
    .map((w) => w.slice(0, 1).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
};

export const parseOrderStatus = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.PLACED:
      return 'Placed';

    case OrderStatus.CANCELLED:
      return 'Cancelled';

    case OrderStatus.FULFILLED:
      return 'Fulfilled';

    case OrderStatus.PARTIALLY_FULFILLED:
      return 'Partially Fulfilled';

    case OrderStatus.PICKUP_MISSED:
      return 'Pickup Missed';

    case OrderStatus.PICKUP_CANCELLED:
      return 'Pickup Cancelled';

    default:
      return '';
  }
};
