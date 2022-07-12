/* eslint-disable no-shadow */
/**
 * @file Type declarations for membership portal ui
 */

import { Moment } from 'moment';
import { PublicMerchItem, PublicMerchItemOption, PublicOrder, PublicOrderItem } from './api';

export type Uuid = string;

export type Event = {
  attendanceCode: string;
  committee: string;
  cover: string | null;
  description: string;
  endDate: Moment;
  endTime: Moment;
  location: string;
  eventLink: string | null;
  pointValue: number;
  startDate: Moment;
  startTime: Moment;
  title: string;
  uuid: string;
};

export type ProfileParams = {
  uuid: string;
};

export interface PublicProfile {
  uuid: Uuid;
  firstName: string;
  lastName: string;
  profilePicture: string;
  graduationYear: number;
  major: string;
  bio: string;
  points: number;
}

export interface CartItem {
  item: PublicMerchItem;
  option: PublicMerchItemOption;
  quantity: number;
}

export interface Cart {
  [uuid: string]: CartItem;
}

export interface PublicCartMerchItem {
  uuid: Uuid;
  itemName: string;
  picture: string;
  description: string;
}

export interface PublicOrderItemForFulfillment extends PublicOrderItem {
  needsFulfillment: boolean;
}

export interface PublicOrderItemWithQuantity extends PublicOrderItem {
  quantity: number;
}

export interface PublicOrderForFulfillment extends PublicOrder {
  items: PublicOrderItemForFulfillment[];
}
