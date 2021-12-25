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

export type Event = {
  attendanceCode: string;
  committee: string;
  cover: string | null;
  description: string;
  endDate: Moment;
  endTime: Moment;
  location: string;
  pointValue: number;
  startDate: Moment;
  startTime: Moment;
  title: string;
  uuid: string;
};

export type Uuid = string;

export interface PublicMerchCollection {
  uuid: Uuid;
  title: string;
  themeColorHex?: string;
  description: string;
  items: PublicMerchItem[];
}

export interface PublicMerchItem {
  uuid: Uuid;
  itemName: string;
  collection: PublicMerchCollection;
  picture: string;
  description: string;
  monthlyLimit: number;
  lifetimeLimit: number;
  hasVariantsEnabled: boolean;
  options: PublicMerchItemOption[];
}

export interface PublicMerchItemOption {
  uuid: Uuid;
  price: number;
  quantity: number;
  discountPercentage: number;
  metadata: MerchItemOptionMetadata | null;
}

export interface PublicMerchItemWithPurchaseLimits extends PublicMerchItem {
  monthlyRemaining: number;
  lifetimeRemaining: number;
}

export interface MerchItemOptionMetadata {
  type: string;
  value: string;
  position: number;
}

export interface CartItem {
  item: PublicMerchItem;
  option: PublicMerchItemOption;
  quantity: number;
}

export interface PublicOrderItem {
  uuid: Uuid;
  option: PublicMerchItemOption;
  salePriceAtPurchase: number;
  discountPercentageAtPurchase: number;
  fulfilled: boolean;
  fulfilledAt?: Date;
  notes?: string;
}

export interface PublicOrder {
  uuid: Uuid;
  user: Uuid;
  totalCost: number;
  orderedAt: Date;
  pickupEvent: PublicOrderPickupEvent;
  items: PublicOrderItem[];
}

export interface PublicOrderPickupEvent {
  uuid: Uuid;
  title: string;
  start: Date;
  end: Date;
  description: string;
  orders?: PublicOrder[];
}
