const apiurl = process.env.REACT_APP_API_URL;

export default {
  API_URL: apiurl,
  user: {
    user: '/api/v2/user',
    activity: '/api/v2/user/activity',
    profilepicture: '/api/v2/user/picture',
  },
  auth: {
    register: '/api/v2/auth/registration',
    login: '/api/v2/auth/login',
    verification: '/api/v2/auth/verification',
    resetPassword: '/api/v2/auth/passwordReset',
    emailVerification: '/api/v2/auth/emailVerification',
    emailModification: '/api/v2/auth/emailModification',
  },
  admin: {
    attendance: '/api/v2/admin/attendance',
    bonus: '/api/v2/admin/bonus',
    email: '/api/v2/admin/email',
  },
  events: {
    event: '/api/v2/event',
    past: '/api/v2/event/past',
    future: '/api/v2/event/future',
    picture: '/api/v2/event/picture',
  },
  attendance: '/api/v2/attendance',
  leaderboard: '/api/v2/leaderboard',
  store: {
    collection: '/api/v2/merch/collection',
    item: '/api/v2/merch/item',
    itemPicture: '/api/v2/merch/item/picture',
    option: '/api/v2/merch/option',
    verification: '/api/v2/merch/order/verification',
    order: '/api/v2/merch/order',
    orders: '/api/v2/merch/orders',
    cart: '/api/v2/merch/cart',
    pickup: {
      future: '/api/v2/merch/order/pickup/future',
      past: '/api/v2/merch/order/pickup/past',
      single: '/api/v2/merch/order/pickup',
    },
  },
};
