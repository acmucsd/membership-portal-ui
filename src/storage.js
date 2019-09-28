/**
 * @file Manages the storage for the auth tokens.
 * @author ACM @ UCLA
 * https://github.com/uclaacm/membership-portal-ui/blob/master/src/storage.js
 */

const storageAvailable = (type) => {
  try {
    const storage = window[type];
    const x = '__storage_test__';
  ***REMOVED***.setItem(x, x);
  ***REMOVED***.removeItem(x);
    return true;
  } catch (e) {
    return false;
  }
***REMOVED***

class CookieStore {
  static set(key, value) {
    document.cookie = `${key}=${value}`;
  }

  static get(key) {
    if (!document.cookie || document.cookie.length === 0) return undefined;
    const cookies = {***REMOVED***
    document.cookie.split(';').forEach((cookie) => {
      cookies[cookie.split('=')[0].trim()] = cookie.split('=')[1].trim();
***REMOVED***
    return cookies[key];
  }

  static remove(key) {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  }
}

class LocalStore {
  static set(key, value) {
    window.localStorage.setItem(key, value);
  }

  static get(key, value) {
    return window.localStorage.getItem(key);
  }

  static remove(key) {
    window.localStorage.removeItem(key);
  }
}

export default (storageAvailable('localStorage') ? LocalStore : CookieStore);
