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
