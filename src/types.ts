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
  quantity?: number;
  discountPercentage: number;
  metadata: MerchItemOptionMetadata;
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
