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
      register: '/api/v2/auth/registration',
      login: '/api/v2/auth/login',
      verification: '/api/v2/auth/verification',
      resetPassword: '/api/v2/auth/passwordReset',
      emailVerification: '/api/v2/auth/emailVerification',
    },
    admin: {
      attendance: '/api/v2/admin/attendance',
      bonus: '/api/v2/admin/bonus',
      emails: '/api/v2/admin/email',
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
      cart: '/api/v2/merch/store/cart',
      verification: '/api/v2/merch/order/verification',
    },
  },
};
