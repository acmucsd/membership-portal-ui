/* eslint-disable no-shadow */
/**
 * @file Type declarations for membership portal ui
 */

import { Moment } from 'moment';

// generic fetch function
export type HttpRequestMethod = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE' | 'PATCH';
export type MimeType = 'json' | 'image';
export type FetchServiceOptions = {
  requiresAuthorization: boolean;
  payload?: any;
  onFailCallback?: () => void;
};

export enum UserAccessType {
  RESTRICTED = 'RESTRICTED',
  STANDARD = 'STANDARD',
  STAFF = 'STAFF',
  ADMIN = 'ADMIN',
  MARKETING = 'MARKETING',
  MERCH_STORE_MANAGER = 'MERCH_STORE_MANAGER',
  MERCH_STORE_DISTRIBUTOR = 'MERCH_STORE_DISTRIBUTOR',
}

export enum UserState {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  BLOCKED = 'BLOCKED',
  PASSWORD_RESET = 'PASSWORD_RESET',
}

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

export interface PublicProfileWithEmail extends PublicProfile {
  email: string;
}

export interface MerchItemOptionMetadata {
  type: string;
  value: string;
  position: number;
}

export interface PublicMerchCollection {
  uuid: Uuid;
  title: string;
  themeColorHex?: string;
  description: string;
  archived?: boolean;
  items: PublicMerchItem[];
}

export interface PublicMerchItem {
  uuid: Uuid;
  itemName: string;
  collection?: PublicMerchCollection;
  picture: string;
  description: string;
  monthlyLimit: number;
  lifetimeLimit: number;
  hidden?: boolean;
  hasVariantsEnabled: boolean;
  options: PublicMerchItemOption[];
}

export interface PublicMerchItemWithPurchaseLimits extends PublicMerchItem {
  monthlyRemaining: number;
  lifetimeRemaining: number;
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

export interface PublicMerchItemOption {
  uuid: Uuid;
  price: number;
  quantity: number;
  discountPercentage: number;
  metadata?: MerchItemOptionMetadata;
}

export interface PublicOrderMerchItemOption {
  uuid: Uuid;
  price: number;
  discountPercentage: number;
  metadata?: MerchItemOptionMetadata;
  item: PublicCartMerchItem;
}

export interface PublicOrderItem {
  uuid: Uuid;
  option: PublicOrderMerchItemOption;
  salePriceAtPurchase: number;
  discountPercentageAtPurchase: number;
  fulfilled: boolean;
  fulfilledAt?: Date;
  notes?: string;
}

export interface PublicOrderItemForFulfillment extends PublicOrderItem {
  needsFulfillment: boolean;
}

export interface PublicOrderItemWithQuantity extends PublicOrderItem {
  quantity: number;
}

export enum OrderStatus {
  PLACED = 'PLACED', // REQUESTED = 'REQUESTED',
  CANCELLED = 'CANCELLED',
  FULFILLED = 'FULFILLED',
  PARTIALLY_FULFILLED = 'PARTIALLY_FULFILLED',
  PICKUP_MISSED = 'PICKUP_MISSED',
  PICKUP_CANCELLED = 'PICKUP_CANCELLED',
}

export interface PublicOrder {
  uuid: Uuid;
  user: PublicProfile;
  totalCost: number;
  status: OrderStatus;
  orderedAt: Date;
  pickupEvent: PublicOrderPickupEvent;
}

export interface PublicOrderWithItems extends PublicOrder {
  items: PublicOrderItem[];
}

export interface PublicOrderForFulfillment extends PublicOrder {
  items: PublicOrderItemForFulfillment[];
}

export enum OrderPickupEventStatus {
  ACTIVE = 'ACTIVE',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}

export interface PublicOrderPickupEvent {
  uuid: Uuid;
  title: string;
  start: Date;
  end: Date;
  description: string;
  orders?: PublicOrderWithItems[];
  orderLimit?: number;
  status: OrderPickupEventStatus;
}
