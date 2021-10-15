/**
 * @file Type declarations for membership portal ui
 */

// generic fetch function
export type HttpRequestMethod = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE' | 'PATCH';
export type MimeType = 'json' | 'image';
export type FetchServiceOptions = {
  requiresAuthorization: boolean;
  payload?: any;
  onFailCallback?: () => void;
};

export type Uuid = string;

export interface MerchandiseCollectionModel {
  uuid: Uuid;
  title: string;
  color: string;
  description: string;
  archived: boolean;
  items: MerchandiseItemModel[];
}

export interface MerchandiseItemModel {
  uuid: Uuid;
  itemName: string;
  collection: MerchandiseCollectionModel;
  picture: string;
  description: string;
  monthlyLimit: number;
  lifetimeLimit: number;
  hidden: boolean;
  hasVariantsEnabled: boolean;
  options: MerchandiseItemOptionModel[];
}

export interface MerchandiseItemOptionModel {
  uuid: Uuid;
  item: MerchandiseItemModel;
  quantity: number;
  price: number;
  discountPercentage: number;
  orders: OrderItemModel[];
  metadata: MerchItemOptionMetadata | null;
}

export interface MerchItemOptionMetadata {
  type: string; // e.g. 'size', 'shape'
  value: string; // e.g. 'S', 'M', 'L' if this.type === 'size'
  position: number; // e.g. 0, 1, 2 (for sort order, i.e. XS < S < M < L < XL etc)
}

export interface OrderModel {
  uuid: Uuid;
  user: any; // TODO: Include user model
  totalCost: number;
  orderedAt: Date;
  pickupEvent: OrderPickupEvent;
  status: 'PLACED' | 'PICKUP_MISSED' | 'PICKUP_CANCELLED' | 'CANCELLED' | 'FULFILLED';
  items: OrderItemModel[];
}

export interface OrderItemModel {
  uuid: Uuid;
  order: OrderModel;
  option: MerchandiseItemOptionModel;
  salePriceAtPurchase: number;
  discountPercentageAtPurchase: number;
  fulfilled: boolean;
  fulfilledAt: Date;
  notes: string;
}

export interface OrderPickupEvent {
  uuid: Uuid;
  orders: OrderModel[];
  start: Date;
  end: Date;
  details: string;
}
