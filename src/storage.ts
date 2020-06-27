/**
 * @file Manages the storage for the auth tokens.
 * @author ACM @ UCLA
 * https://github.com/uclaacm/membership-portal-ui/blob/master/src/storage.js
 */

const storageAvailable = (type: any) => {
  try {
    const storage: any = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return false;
  }
};

const CookieStore = {
  set(key: string, value: string) {
    document.cookie = `${key}=${value}`;
  },

  get(key: string) {
    if (!document.cookie || document.cookie.length === 0) return undefined;
    const cookies: { [key: string]: string } = {};
    document.cookie.split(';').forEach((cookie) => {
      cookies[cookie.split('=')[0].trim()] = cookie.split('=')[1].trim();
    });
    return cookies[key];
  },

  remove(key: string) {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  },
};

const LocalStore = {
  set(key: string, value: string) {
    window.localStorage.setItem(key, value);
  },

  get(key: string) {
    return window.localStorage.getItem(key);
  },

  remove(key: string) {
    window.localStorage.removeItem(key);
  },
};

export default storageAvailable('localStorage') ? LocalStore : CookieStore;
