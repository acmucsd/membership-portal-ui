let apiurl = 'https://acmucsd-membership-portal-api.herokuapp.com';
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  apiurl = 'http://localhost:3000';
}

export default {
  API_URL: apiurl,
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
      user: '/api/v1/user',
      bonus: '/api/v1/user/bonus',
      activity: '/api/v1/user/activity',
      profilepicture: '/api/v1/user/picture',
    },
    activity: '/api/v1/activity',
    auth: {
      register: '/api/v1/auth/register',
      login: '/api/v1/auth/login',
      verification: '/api/v1/auth/verification',
      resetPassword: '/api/v1/auth/resetPassword',
    },
    events: {
      event: '/api/v1/event',
      past: '/api/v1/event/past',
      future: '/api/v1/event/future',
    },
    attendance: {
      fetch: '/api/v1/attendance',
      attend: '/api/v1/attendance/attend',
    },
    leaderboard: '/api/v1/leaderboard',
  },
***REMOVED***
