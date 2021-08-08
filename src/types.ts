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
  color: string; // hex color used for the title (each collection title has its own text color)
  description: string;
  archived: boolean;
  items: MerchandiseItemModel[];
}

export interface MerchandiseItemModel {
  uuid: Uuid;
  itemName: string;
  picture: string;
  description: string;
  hidden: boolean;
  // then is set to true, otherwise false
  options: MerchandiseItemOptionModelProps[];
}

export interface MerchandiseItemOptionModelProps {
  quantity: number;
  price: number;
  discountPercentage: number;
  type: string; // e.g. 'size', 'shape'
  value: string; // e.g. 'S', 'M', 'L' if this.type === 'size'
  position: number; // e.g. 0, 1, 2 (for sort order, i.e. XS < S < M < L < XL etc)
}
