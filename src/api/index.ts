// API Enums, Request, and Response Types sourced from:
// https://github.com/acmucsd/membership-portal/commit/4382601bb56990ea2d37333d42a1349e036d1993
// Current as of Jul 8, 2022

import AdminRoutes from './AdminRoutes';
import AttendanceRoutes from './AttendanceRoutes';
import AuthRoutes from './AuthRoutes';
import EventRoutes from './EventRoutes';
import FetchService from './FetchService';
import LeaderboardRoutes from './LeaderboardRoutes';
import MerchStoreRoutes from './MerchStoreRoutes';
import UserRoutes from './UserRoutes';

class ApiInterface {
  constructor(logoutHandler: Function) {
    const fetchService = new FetchService(logoutHandler);
    const adminRoutes = new AdminRoutes(fetchService);
    const attendanceRoutes = new AttendanceRoutes(fetchService);
    const authRoutes = new AuthRoutes(fetchService);
    const eventRoutes = new EventRoutes(fetchService);
    const leaderboardRoutes = new LeaderboardRoutes(fetchService);
    const merchStoreRoutes = new MerchStoreRoutes(fetchService);
    const userRoutes = new UserRoutes(fetchService);

    return {
      ...adminRoutes,
      ...attendanceRoutes,
      ...authRoutes,
      ...eventRoutes,
      ...leaderboardRoutes,
      ...merchStoreRoutes,
      ...userRoutes,
    };
  }
}

export * from './ApiRequests';
export * from './ApiResponses';
export * from './Enums';

export default ApiInterface;
