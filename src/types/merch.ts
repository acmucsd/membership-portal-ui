export interface MerchCollection {
  uuid: string;
  title: string;
  description: string;
  items: MerchItem[];
}

export interface MerchItem {
  uuid: string;
  itemName: string;
  collection: MerchCollection;
  picture: string;
  price: number;
  description: string;
  discountPercentage: number;
  monthlyLimit: number;
  lifetimeLimit: number;
}

export interface OrderItem {
  uuid: string;
  extras?: string[];
  item: MerchItem;
  salePriceAtPurchase: number;
  discountPercentageAtPurchase: number;
  fulfilled: boolean;
  quantity?: number;
  fulfilledAt?: Date;
  notes?: string;
}

export interface Order {
  uuid: string;
  user: string;
  totalCost: number;
  orderedAt: Date;
  items: OrderItem[];
}

export interface PatchOrderItemPayload {
  uuid: string;
  fulfilled?: boolean;
  notes?: string;
}
