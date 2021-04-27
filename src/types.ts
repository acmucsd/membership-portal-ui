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
