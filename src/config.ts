const apiurl = process.env.REACT_APP_API_URL;

export default {
  API_URL: apiurl,
  AWS_URL: 'https://acmucsd.s3-us-west-1.amazonaws.com/portal',
  about: `With 100,000 members and 500+ chapters, the Association for Computing
          Machinery is the world's largest society for computing. Here at UC
          San Diego, our chapter has been established with the mission of
          creating a member-first community devoted to the field of computing.
          We welcome students of all backgrounds and skill levels to come
          develop their skills at our many workshops and form new friendships at
          our many socials. Get involved today by signing up for an event on
          this portal or following us on social media!`,
  routes: {
    user: {
      user: '/api/v2/user',
      activity: '/api/v2/user/activity',
      profilepicture: '/api/v2/user/picture',
    },
    activity: '/api/v2/activity',
    auth: {
      register: '/api/v2/auth/registration', // Done
      login: '/api/v2/auth/login', // Done
      verification: '/api/v2/auth/verification', // Done
      resetPassword: '/api/v2/auth/passwordReset', // Done
      emailVerification: '/api/v2/auth/emailVerification', // Done
      emailModification: '/api/v2/auth/emailModification', // Done
    },
    admin: {
      attendance: '/api/v2/admin/attendance', // Done
      bonus: '/api/v2/admin/bonus', // Done
      email: '/api/v2/admin/email', // Done
    },
    events: {
      event: '/api/v2/event', // Done
      past: '/api/v2/event/past', // Done
      future: '/api/v2/event/future', // Done
      picture: '/api/v2/event/picture', // Done
    },
    attendance: '/api/v2/attendance', // Done
    leaderboard: '/api/v2/leaderboard',
    store: {
      collection: '/api/v2/merch/collection',
      item: '/api/v2/merch/item',
      itemPicture: '/api/v2/merch/item/picture',
      option: '/api/v2/merch/option',
      verification: '/api/v2/merch/order/verification',
      order: '/api/v2/merch/order',
      orders: '/api/v2/merch/orders',
      pickup: {
        future: '/api/v2/merch/order/pickup/future',
        past: '/api/v2/merch/order/pickup/past',
        single: '/api/v2/merch/order/pickup',
      },
    },
  },
};
